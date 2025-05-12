import express from "express";

import {createbatter} from "../../Controllers/MyCricketControllers/CreateBatter.js";

export const createbatterrouter = express.Router()

createbatterrouter.post('/:inningId/batters', createbatter)



