import express from "express";

import {updateinnings} from "../../Controllers/MyCricketControllers/UpdateInnings.js";

export const updateinningsrouter = express.Router()

updateinningsrouter.put('/innings/:id', updateinnings);



