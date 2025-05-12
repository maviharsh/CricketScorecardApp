import express from "express";

import {createinnings} from "../../Controllers/MyCricketControllers/CreateInnings.js";

export const createinningsrouter = express.Router()

createinningsrouter.post('/:matchId/toss', createinnings)



