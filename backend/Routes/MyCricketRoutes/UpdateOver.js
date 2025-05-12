import express from "express";

import {updateover} from "../../Controllers/MyCricketControllers/UpdateOver.js";

export const updateoverrouter = express.Router()

updateoverrouter.put('/overs/:overId', updateover);



