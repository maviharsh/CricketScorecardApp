import express from "express";

//controller functions
import { scorer, getscorer } from "../Controllers/Scorer.js";

export const scorerrouter = express.Router()

scorerrouter.post('/', scorer)
scorerrouter.get('/',getscorer)



