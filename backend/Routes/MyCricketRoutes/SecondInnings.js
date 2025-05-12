import express from "express";

import {secondinnings} from "../../Controllers/MyCricketControllers/SecondInnings.js";

export const secondinningsrouter = express.Router()

secondinningsrouter.post('/:matchId/innings', secondinnings);



