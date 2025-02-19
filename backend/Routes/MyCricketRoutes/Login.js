import express from "express";

import { login } from "../../Controllers/MyCricketControllers/Login.js";

export const loginrouter = express.Router()

loginrouter.post('/', login)



