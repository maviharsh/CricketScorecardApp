import express from "express";

import {updatebowlerperformance} from "../../Controllers/MyCricketControllers/UpdateBowlerPerformance.js";

export const updatebowlerperformacerouter = express.Router()

updatebowlerperformacerouter.put('/bowlers/:id', updatebowlerperformance);



