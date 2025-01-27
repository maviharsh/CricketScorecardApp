import express from "express";

//controller functions
import { coach } from "../Controllers/Coach.js";

export const router = express.Router()

//create user route
router.post('/', coach)


