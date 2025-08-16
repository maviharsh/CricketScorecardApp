// /src/Routes/api.js
import express from "express";
import { addTeam, findTeam } from "../../Controllers/MyCricketControllers/teamController.js";
import { findPlayersByContact, findPlayersByName } from "../../Controllers/MyCricketControllers/playerController.js";
import { getAllMatches, getMatchById, createMatch, processToss,startSecondInning,completeMatch } from "../../Controllers/MyCricketControllers/matchController.js";
import { recordDelivery } from "../../Controllers/MyCricketControllers/scorecardController.js";
import { setupInning,selectNewBatter,selectNewBowler } from "../../Controllers/MyCricketControllers/inningController.js";
import {undoLastDelivery} from "../../Controllers/MyCricketControllers/undoController.js";


const router = express.Router();

// Team Routes
router.post('/teams', addTeam);
router.post('/teams/find', findTeam);

// Player Routes
router.post('/players/find-by-contact', findPlayersByContact);
router.get('/players/search', findPlayersByName);

// Match Routes
router.get('/matches', getAllMatches);
router.post('/matches', createMatch);
router.get('/matches/:id', getMatchById);
router.post('/matches/:matchId/toss', processToss);
router.post('/matches/:matchId/start-second-inning', startSecondInning);
router.post('/matches/:matchId/complete', completeMatch);

// Scorecard Route
router.post('/scorecard/record-delivery', recordDelivery);

// Inning Setup Route
router.post('/innings/:inningId/setup', setupInning);
router.post('/innings/:inningId/new-batter', selectNewBatter);
router.post('/innings/:inningId/new-bowler', selectNewBowler);

// Undo Route
router.post('/innings/:inningId/undo', undoLastDelivery);
export default router;