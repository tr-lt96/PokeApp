// server/utils/pokeApiService.js
const axios = require("axios");
const config = require("../../config");
const CachedPokemon = require("../models/Pokemon");

function getStatLabel(statName) {
  if (statName === "special-attack") {
    return "specialAttack";
  }

  if (statName === "special-defense") {
    return "specialDefense";
  }

  return statName;
}

// ✅ Caches full Pokémon info by name (used internally)
async function cachePokemonByName(name) {
  // Attempt to get from cache first
  const exists = await CachedPokemon.findOne({ name: name.toLowerCase() });
  if (exists) return exists;

  const response = await axios.get(
    `${config.pokeApiBaseUrl}/pokemon/${name.toLowerCase()}`
  );

  const data = response.data;

  const pokemonData = {
    pokeId: data.id,
    name: data.name,
    types: data.types.map((t) => t.type.name),
    stats: data.stats.reduce((acc, curr) => {
      const label = getStatLabel(curr.stat.name);
      return {
        ...acc,
        [label]: curr.base_stat,
      };
    }, {}),
    abilities: data.abilities.map((a) => a.ability.name),
    spriteUrl: data.sprites.front_default,
    fetchedAt: new Date(),
  };

  await CachedPokemon.findOneAndUpdate(
    { name: pokemonData.name },
    pokemonData,
    {
      upsert: true,
      new: true,
    }
  );

  return pokemonData;
}

async function fetchPokemonByName(name) {
  try {
    // Fetch from external PokeAPI
    const pokemonData = await cachePokemonByName(name);
    return pokemonData;
  } catch (error) {
    console.error("Error fetching Pokemon from PokeAPI:", error.message);
    throw new Error("Pokemon not found");
  }
}

async function fetchAllPokemon(limit = 10, offset = 0) {
  console.log("try fetching all pokemon");
  try {
    const result = await axios.get(
      `${config.pokeApiBaseUrl}/pokemon?limit=${limit}&offset=${offset}`
    );
    const list = result.data.results;

    const detailed = await Promise.all(
      list.map((entry) => cachePokemonByName(entry.name)) // fetch and cache in parallel
    );

    return {
      total: result.data.count,
      limit,
      offset,
      results: detailed,
    };
  } catch (error) {
    console.error("Error fetching Pokemon from PokeAPI:", error.message);
    throw new Error("Pokemon not found");
  }
}

async function fetchPokemonByType(type, limit = 10, offset = 0) {
  try {
    const result = await axios.get(`${config.pokeApiBaseUrl}/type/${type}`);
    const allPokemonNames = result.data.pokemon.map((p) => p.pokemon.name);
    const total = allPokemonNames.length;
    const selected = allPokemonNames.slice(offset, offset + limit);

    const detailed = await Promise.all(
      selected.map((name) => cachePokemonByName(name))
    );

    return {
      type,
      total,
      limit,
      offset,
      results: detailed,
    };
  } catch (error) {
    console.error("Error fetching Pokemon from PokeAPI:", error.message);
    throw new Error("Pokemon not found");
  }
}

module.exports = {
  fetchPokemonByName,
  fetchAllPokemon,
  fetchPokemonByType,
};
