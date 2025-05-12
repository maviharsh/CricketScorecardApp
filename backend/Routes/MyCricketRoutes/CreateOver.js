import express from "express";

import {createover} from "../../Controllers/MyCricketControllers/CreateOver.js";

export const createoverrouter = express.Router()

createoverrouter.post('/:inningId/overs', createover)



