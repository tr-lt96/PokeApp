// server/models/CachedPokemon.js
const mongoose = require("mongoose");

const cachedPokemonSchema = new mongoose.Schema({
  pokeId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  types: [String],
  stats: {
    hp: Number,
    attack: Number,
    defense: Number,
    specialAttack: Number,
    specialDefense: Number,
    speed: Number,
  },
  spriteUrl: String,
  abilities: [String],
  fetchedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CachedPokemon", cachedPokemonSchema);
