import express from "express";

import {getinnings} from "../../Controllers/MyCricketControllers/GetInnings.js";

export const getinningsrouter = express.Router()

getinningsrouter.get('/innings/:id', getinnings);



