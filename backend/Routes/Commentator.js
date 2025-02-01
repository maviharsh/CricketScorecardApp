import express from "express";

//controller functions
import { commentator, getcommentator } from "../Controllers/Commentator.js";

export const commentatorrouter = express.Router()

commentatorrouter.post('/', commentator)
commentatorrouter.get('/',getcommentator)



