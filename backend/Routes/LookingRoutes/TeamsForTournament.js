import express from "express";

//controller functions
import { teamsfortournament, getteamsfortournament } from "../../Controllers/LookingControllers/TeamsForTournament.js";

export const teamsfortournamentrouter = express.Router()

teamsfortournamentrouter.post('/', teamsfortournament)
teamsfortournamentrouter.get('/',getteamsfortournament)



