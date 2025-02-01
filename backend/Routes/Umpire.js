import express from "express";

//controller functions
import { umpire, getumpire } from "../Controllers/Umpire.js";

export const umpirerouter = express.Router()

umpirerouter.post('/', umpire)
umpirerouter.get('/',getumpire)



