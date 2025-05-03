// server/routes/teamRoutes.js
const express = require('express');
const { body } = require('express-validator');
const validateRequest = require('../middleware/validationMiddleware');
const teamController = require('../controllers/teamControllers');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all team routes
router.use(authMiddleware);
// Create a new team
router.post(
  '/create',
  [
    body('name').notEmpty().withMessage('Team name is required'),
  ],
  validateRequest,
  teamController.createTeam
);
// add a Pokemon to a team
router.post(
  '/:teamId/pokemon',
  [
    body('pokemonName').notEmpty().withMessage('Pokemon name is required'),
  ],
  validateRequest,
  teamController.addPokemonToTeam
);
// Evaluate a team
router.get('/:teamId/evaluation', teamController.evaluateTeam);

// Get all teams for a user
router.get('/', teamController.getAllTeams);

// Get a specific team by ID
router.get('/:teamId', teamController.getTeamById);

//Delete a team
router.delete('/:teamId', teamController.deleteTeam);
module.exports = router;
