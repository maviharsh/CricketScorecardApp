import express from "express";

//controller functions
import { tournamenttoparticipate, gettournamenttoparticipate } from "../../Controllers/LookingControllers/TournamentToParticipate.js";

export const tournamenttoparticipaterouter = express.Router()

tournamenttoparticipaterouter.post('/', tournamenttoparticipate)
tournamenttoparticipaterouter.get('/',gettournamenttoparticipate)



