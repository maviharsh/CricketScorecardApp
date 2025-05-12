import express from "express";

import {createbowler} from "../../Controllers/MyCricketControllers/CreateBowler.js";

export const createbowlerrouter = express.Router()

createbowlerrouter.post('/:inningId/bowlers', createbowler)



