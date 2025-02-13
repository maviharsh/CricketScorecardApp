import express from "express";

//controller functions
import { playerforteam, getplayerforteam } from "../../Controllers/LookingControllers/PlayerForTeam.js";

export const playerforteamrouter = express.Router()

playerforteamrouter.post('/', playerforteam)
playerforteamrouter.get('/',getplayerforteam)



