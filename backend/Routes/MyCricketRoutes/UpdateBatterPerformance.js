import express from "express";

import {updatebatterperformance} from "../../Controllers/MyCricketControllers/UpdateBatterPerformance.js";

export const updatebatterperformacerouter = express.Router()

updatebatterperformacerouter.put('/batters/:id', updatebatterperformance);



