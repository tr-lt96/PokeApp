// server/controllers/pokemonController.js
const {
  fetchPokemonByName,
  fetchAllPokemon,
  fetchPokemonByType,
} = require("../Utillities/pokeApiService");

exports.searchPokemon = async (req, res) => {
  const name = req.query.search;
  if (!name)
    return res.status(400).json({ message: "Please provide a Pokemon name" });

  try {
    const pokemon = await fetchPokemonByName(name);
    res.json(pokemon);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getAllPokemon = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  try {
    const pokemons = await fetchAllPokemon(limit, offset);
    res.status(200).json(pokemons);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch Pokémon from PokeAPI",
      error: err.message,
    });
  }
};

exports.getPokemonByType = async (req, res) => {
  const type = req.params.type.toLowerCase();
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  if (!type)
    return res.status(400).json({ message: "Please provide a Pokemon type" });

  try {
    const pokemons = await fetchPokemonByType(type, limit, offset);
    res.status(200).json(pokemons);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch Pokémon by type", error: err.message });
  }
};
