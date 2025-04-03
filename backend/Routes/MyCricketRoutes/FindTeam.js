import express from "express";

import {findteam} from "../../Controllers/MyCricketControllers/FindTeam.js";

export const findteamrouter = express.Router()

findteamrouter.post('/', findteam)



