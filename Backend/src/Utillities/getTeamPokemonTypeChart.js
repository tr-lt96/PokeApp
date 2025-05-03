// server/utils/getTeamPokemonTypeChart.js
const axios = require("axios");
const config = require("../../config");

/**
 * Get the relation chart that consists of every team's pokemon type relation  data.
 * E.g
 * ```json
 * {
 *  "ground": {
 *    "strong": ["poison", "rock", "electric"]
 *  }
 * }
 * ```
 *
 * @param {string[]} teamPokemonTypes - An array that consists of every team's pokemon type
 */
async function getTeamPokemonTypeChart(teamPokemonTypes) {
  const uniquePokemonTypes = new Set(teamPokemonTypes);

  const results = await Promise.allSettled(
    Array.from(uniquePokemonTypes).map((type) =>
      axios.get(`${config.pokeApiBaseUrl}/type/${type}`)
    )
  );

  const typeRelationDatas = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => {
      const rawData = result.value.data;

      return {
        name: rawData?.name,
        strong: rawData?.["damage_relations"]?.["double_damage_to"]?.map(
          (type) => type.name
        ),
        weak: rawData?.["damage_relations"]?.["double_damage_from"]?.map(
          (type) => type.name
        ),
      };
    });

  const typeRelationChart = (typeRelationDatas || []).reduce((acc, type) => {
    return {
      ...acc,
      [type.name]: {
        weak: type.weak,
        strong: type.strong,
      },
    };
  }, {});

  return typeRelationChart;
}

module.exports = {
  getTeamPokemonTypeChart,
};
