import express from "express";

//controller functions
import { streamer, getstreamer } from "../Controllers/Streamer.js";

export const streamerrouter = express.Router()

streamerrouter.post('/', streamer)
streamerrouter.get('/',getstreamer)



