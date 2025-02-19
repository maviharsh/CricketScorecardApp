import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import {coachrouter, commentatorrouter, groundrouter, loginrouter, scorerrouter, shoprouter, streamerrouter, tshirtrouter, umpirerouter} from "./Routes/index.js"  //COMMUNITY ROUTERS
import {groundlookingrouter, opponentrouter, playerforteamrouter, scorerlookingrouter, teamforplayerrouter, teamsfortournamentrouter, tournamenttoparticipaterouter, umpirelookingrouter} from "./Routes/index.js"  //LOOKING ROUTERS
import { userrouter } from "./Routes/MyCricketRoutes/User.js";


const app = express();
dotenv.config();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

const port = process.env.PORT || 4000;
const URL = process.env.MONGO_PASS;

// MongoDB connection
mongoose.connect(URL)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log("MongoDB connection failed:", err.message);
    });

// Routes
app.get("/", (req, res) => {
    res.send("Hello");
});

app.get("/hi", (req, res) => {
    res.send("Hi");
});

//COMMUNITY ROUTES
app.use('/api/coachform', coachrouter)
app.use('/api/commentatorform', commentatorrouter)
app.use('/api/groundform', groundrouter)
app.use('/api/scorerform', scorerrouter)
app.use('/api/shopform', shoprouter)
app.use('/api/streamerform', streamerrouter)
app.use('/api/tshirtform', tshirtrouter)
app.use('/api/umpireform', umpirerouter)

//LOOKING ROUTES
app.use('/api/groundlookingform', groundlookingrouter)
app.use('/api/opponentform', opponentrouter)
app.use('/api/playerforteamform', playerforteamrouter)
app.use('/api/scorerlookingform', scorerlookingrouter)
app.use('/api/teamforplayerform', teamforplayerrouter)
app.use('/api/teamsfortournamentform', teamsfortournamentrouter)
app.use('/api/tournamenttoparticipateform', tournamenttoparticipaterouter)
app.use('/api/umpirelookingform', umpirelookingrouter)

//MYCRICKET ROUTES
app.use('/api/userform', userrouter)
app.use('/api/loginform',loginrouter)

// Start server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
