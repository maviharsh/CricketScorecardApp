import express from "express";

//controller functions
import { shop, getshop } from "../Controllers/Shop.js";

export const shoprouter = express.Router()

shoprouter.post('/', shop)
shoprouter.get('/',getshop)



