import express from "express";

//controller functions
import { scorer, getscorer } from "../../Controllers/LookingControllers/ScorerLooking.js";

export const scorerlookingrouter = express.Router()

scorerlookingrouter.post('/', scorer)
scorerlookingrouter.get('/',getscorer)



