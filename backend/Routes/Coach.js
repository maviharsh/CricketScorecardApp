import express from "express";

//controller functions
import { coach, getcoach } from "../Controllers/Coach.js";

export const coachrouter = express.Router()

coachrouter.post('/', coach)
coachrouter.get('/',getcoach)



