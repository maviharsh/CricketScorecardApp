import express from "express";

//controller functions
import { tshirt, gettshirt } from "../../Controllers/CommunityControllers/TShirt.js";

export const tshirtrouter = express.Router()

tshirtrouter.post('/', tshirt)
tshirtrouter.get('/',gettshirt)



