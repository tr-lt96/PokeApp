// server/utils/typeChart.js
const typeChart = {
    Fire: {
      strongAgainst: ['Grass', 'Ice', 'Bug', 'Steel'],
      weakAgainst: ['Water', 'Rock', 'Ground'],
    },
    Water: {
      strongAgainst: ['Fire', 'Rock', 'Ground'],
      weakAgainst: ['Electric', 'Grass'],
    },
    Grass: {
      strongAgainst: ['Water', 'Rock', 'Ground'],
      weakAgainst: ['Fire', 'Ice', 'Poison', 'Flying', 'Bug'],
    }
  };
  
  module.exports = typeChart;
  