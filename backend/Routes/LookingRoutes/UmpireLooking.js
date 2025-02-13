import express from "express";

//controller functions
import { umpire, getumpire } from "../../Controllers/LookingControllers/UmpireLooking.js";

export const umpirelookingrouter = express.Router()

umpirelookingrouter.post('/', umpire)
umpirelookingrouter.get('/',getumpire)



