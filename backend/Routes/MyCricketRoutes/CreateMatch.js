import express from "express";

import {creatematch} from "../../Controllers/MyCricketControllers/CreateMatch.js";

export const creatematchrouter = express.Router()

creatematchrouter.post('/', creatematch)



