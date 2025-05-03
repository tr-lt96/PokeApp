import { TOKEN_KEY } from "../constants";

export const getPokemonDataFromPokemonId = async (pokemonNameId) => {
  const result = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonNameId}/`
  );

  const rawJsonData = await result.json();

  if (!rawJsonData) {
    return null;
  }

  return {
    stats: rawJsonData.stats.reduce((acc, stat) => {
      return {
        ...acc,
        [stat.stat.name]: stat.base_stat,
      };
    }, {}),
    size: {
      height: rawJsonData.height,
      weight: rawJsonData.weight,
    },
    abilities: rawJsonData.abilities.map((ability) => ability.ability.name),
    types: rawJsonData.types.map((type) => type.type.name),
    name: rawJsonData.name,
    spriteUrl: rawJsonData.sprites.front_default,
    pokeId: rawJsonData.id,
  };
};

export const getPokemonData = async (pokemonNameId) => {
  if (import.meta.env.VITE_ENV === "local") {
    return await getPokemonDataFromPokemonId(pokemonNameId);
  }

  try {
    const endpoint = `${import.meta.env.VITE_API_ENDPOINT}/pokemon/?search=${pokemonNameId}`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const fetchResult = await fetch(endpoint, {
      method: "GET",
      headers,
    });

    if (!fetchResult?.ok) {
      return null;
    }

    const result = await fetchResult?.json();

    return result;
  } catch (error) {
    console.error(`${error}`);
    return null;
  }
};

export const getAllPokemonData = async ({ limit, offset }) => {
  if (import.meta.env.VITE_ENV === "local") {
    return [];
  }

  try {
    const endpoint = `${import.meta.env.VITE_API_ENDPOINT}/pokemon/all?limit=${limit}&offset=${offset}`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const fetchResult = await fetch(endpoint, {
      method: "GET",
      headers,
    });

    if (!fetchResult?.ok) {
      return null;
    }

    const result = await fetchResult?.json();

    return result;
  } catch (error) {
    console.error(`${error}`);
    return null;
  }
};

export const getPokemonByTypeData = async (type, { limit, offset }) => {
  if (import.meta.env.VITE_ENV === "local") {
    return [];
  }

  try {
    const endpoint = `${import.meta.env.VITE_API_ENDPOINT}/pokemon/type/${type}?limit=${limit}&offset=${offset}`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const fetchResult = await fetch(endpoint, {
      method: "GET",
      headers,
    });

    if (!fetchResult?.ok) {
      return null;
    }

    const result = await fetchResult?.json();

    return result;
  } catch (error) {
    console.error(`${error}`);
    return null;
  }
};

export const searchPokemonByNameId = getPokemonData;
