// server/controllers/teamController.js
const Team = require("../models/Team");
const {
  analysePokemonTypeRelation,
  analyseTeamTypeRelation,
} = require("../Utillities/analyseTeamTypeRelation");
const {
  getTeamPokemonTypeChart,
} = require("../Utillities/getTeamPokemonTypeChart");
const { fetchPokemonByName } = require("../Utillities/pokeApiService");
const typeChart = require("../Utillities/typeChart");

exports.createTeam = async (req, res) => {
  try {
    const { name } = req.body;
    const team = new Team({ name, userId: req.user.userId, pokemons: [] });
    await team.save();
    res.status(201).json({ message: "Team created", team });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Team creation failed", error: error.message });
  }
};

exports.addPokemonToTeam = async (req, res) => {
  try {
    const teamId = req.params.teamId;
    const { pokemonName } = req.body;

    // Validate the team exists and belongs to the logged in user.
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });
    if (team.userId.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to modify this team" });
    }

    // Check maximum allowed Pokémon (6)
    if (team.pokemons.length >= 6) {
      return res.status(400).json({ message: "Team already has 6 Pokémon" });
    }

    // Fetch Pokemon data from PokeAPI (or cache)
    const pokemon = await fetchPokemonByName(pokemonName);
    team.pokemons.push({
      name: pokemon.name,
      pokeId: pokemon.pokeId,
      types: pokemon.types,
      spriteUrl: pokemon.spriteUrl,
      // You may store additional data if needed
    });

    team.updatedAt = new Date();
    await team.save();
    res.json({ message: "Pokemon added to team", team });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add Pokemon", error: error.message });
  }
};

exports.evaluateTeam = async (req, res) => {
  try {
    const teamId = req.params.teamId;
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });
    if (team.userId.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to evaluate this team" });
    }

    // Calculate strengths/weaknesses based solely on Pokémon types.
    const teamPokemonTypes = team.pokemons.map((pokemon) => pokemon.types);
    const relationChart = await getTeamPokemonTypeChart(
      teamPokemonTypes.flat(1)
    );

    const teamTypeRelations = teamPokemonTypes.map((pokemonTypes) =>
      analysePokemonTypeRelation(pokemonTypes, relationChart)
    );
    const typeCharts = analyseTeamTypeRelation(teamTypeRelations);

    res.json({
      team: team.name,
      strongChart: typeCharts.strongChart,
      weakChart: typeCharts.weakChart,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Team evaluation failed", error: error.message });
  }
};
// GET ALL TEAM:
exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find({ userId: req.user.userId });
    res.json(teams);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve teams", error: error.message });
  }
};

// GET TEAM BY ID:
exports.getTeamById = async (req, res) => {
  const team = await Team.findOne({
    _id: req.params.teamId,
    user: req.user.id,
  });
  if (!team) return res.status(404).json({ message: "Team not found" });
  res.status(200).json(team);
};

// DELETE TEAM:
exports.deleteTeam = async (req, res) => {
  const result = await Team.deleteOne({
    _id: req.params.teamId,
    user: req.user.id,
  });
  if (result.deletedCount === 0) {
    return res
      .status(404)
      .json({ message: "Team not found or already deleted" });
  }
  res.status(200).json({ message: "Team deleted successfully" });
};
