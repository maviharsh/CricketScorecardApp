import express from "express";

import {findplayers} from "../../Controllers/MyCricketControllers/FindPlayers.js";

export const findplayersrouter = express.Router()

findplayersrouter.post('/', findplayers)



