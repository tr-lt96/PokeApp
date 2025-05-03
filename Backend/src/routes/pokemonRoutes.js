// server/routes/pokemonRoutes.js
const express = require("express");
const router = express.Router();
const pokemonController = require("../controllers/pokemonController");

router.get("/all", pokemonController.getAllPokemon);
router.get("/type/:type", pokemonController.getPokemonByType);
router.get("/", pokemonController.searchPokemon);

module.exports = router;
