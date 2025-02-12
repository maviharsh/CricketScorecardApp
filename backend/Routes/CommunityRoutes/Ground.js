import express from "express";

//controller functions
import { ground, getground } from "../../Controllers/CommunityControllers/Ground.js";

export const groundrouter = express.Router()

groundrouter.post('/', ground)
groundrouter.get('/',getground)



