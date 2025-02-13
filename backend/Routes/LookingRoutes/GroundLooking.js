import express from "express";

//controller functions
import { ground, getground } from "../../Controllers/LookingControllers/GroundLooking.js";

export const groundlookingrouter = express.Router()

groundlookingrouter.post('/', ground)
groundlookingrouter.get('/',getground)



