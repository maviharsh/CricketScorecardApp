import express from "express";

import { user } from "../../Controllers/MyCricketControllers/User.js";

export const userrouter = express.Router()

userrouter.post('/', user)



