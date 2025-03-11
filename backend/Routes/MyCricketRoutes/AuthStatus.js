import express from "express";

import {AuthStatus} from "../../Controllers/MyCricketControllers/AuthStatus.js";

export const authstatusrouter = express.Router()

authstatusrouter.get('/', AuthStatus)



