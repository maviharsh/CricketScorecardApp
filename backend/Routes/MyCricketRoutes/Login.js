import express from "express";

import { login,logout } from "../../Controllers/MyCricketControllers/Login.js";

export const loginrouter = express.Router()

loginrouter.post('/', login)

loginrouter.post("/logout",logout);

