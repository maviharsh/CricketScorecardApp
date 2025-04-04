import express from "express";

import {addteam} from "../../Controllers/MyCricketControllers/AddTeam.js";

export const addteamrouter = express.Router()

addteamrouter.post('/', addteam)



