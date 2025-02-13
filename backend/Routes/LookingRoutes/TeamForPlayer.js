import express from "express";

//controller functions
import { teamforplayer, getteamforplayer } from "../../Controllers/LookingControllers/TeamForPlayer.js";

export const teamforplayerrouter = express.Router()

teamforplayerrouter.post('/', teamforplayer)
teamforplayerrouter.get('/',getteamforplayer)



