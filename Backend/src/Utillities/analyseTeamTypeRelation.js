const POKE_TYPE_LIST = [
  "normal",
  "fire",
  "water",
  "grass",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

const initTypeWeakRelation = POKE_TYPE_LIST.reduce((acc, type) => {
  return {
    ...acc,
    [type]: 0,
  };
}, {});

const initTypeStrongRelation = POKE_TYPE_LIST.reduce((acc, type) => {
  return {
    ...acc,
    [type]: 0,
  };
}, {});

function analysePokemonTypeRelation(pokemonTypes, typeRelationChart = {}) {
  const typeWeakRelation = { ...initTypeWeakRelation };
  const typeStrongRelation = { ...initTypeStrongRelation };

  pokemonTypes.forEach((type) => {
    const { weak, strong } = typeRelationChart[type];

    weak.forEach((weakType) => {
      if (typeStrongRelation[weakType] > 0) {
        typeStrongRelation[weakType]--;
      } else {
        typeWeakRelation[weakType]++;
      }
    });

    strong.forEach((strongType) => {
      if (typeWeakRelation[strongType] > 0) {
        typeWeakRelation[strongType]--;
      } else {
        typeStrongRelation[strongType]++;
      }
    });
  });

  return {
    weakChart: typeWeakRelation,
    strongChart: typeStrongRelation,
  };
}

function analyseTeamTypeRelation(teamTypeRelations) {
  const teamWeakRelation = { ...initTypeWeakRelation };
  const teamStrongRelation = { ...initTypeStrongRelation };

  POKE_TYPE_LIST.forEach((type) => {
    teamTypeRelations.forEach((pokemonTypeRelation) => {
      teamWeakRelation[type] += pokemonTypeRelation.weakChart[type];
      teamStrongRelation[type] += pokemonTypeRelation.strongChart[type];
    });
  });

  return {
    weakChart: teamWeakRelation,
    strongChart: teamStrongRelation,
  };
}

module.exports = {
  analysePokemonTypeRelation,
  analyseTeamTypeRelation,
};
