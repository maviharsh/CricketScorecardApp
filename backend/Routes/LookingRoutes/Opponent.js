import express from "express";

//controller functions
import { opponent, getopponent } from "../../Controllers/LookingControllers/Opponent.js";

export const opponentrouter = express.Router()

opponentrouter.post('/', opponent)
opponentrouter.get('/',getopponent)



