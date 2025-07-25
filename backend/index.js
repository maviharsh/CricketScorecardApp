import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Assuming these imports are correct based on your project structure
import {
  authstatusrouter, coachrouter, commentatorrouter, groundrouter, scorerrouter, shoprouter, streamerrouter, tshirtrouter, umpirerouter
} from "./Routes/index.js" //COMMUNITY ROUTERS
import {
  groundlookingrouter, opponentrouter, playerforteamrouter, scorerlookingrouter, teamforplayerrouter, teamsfortournamentrouter, tournamenttoparticipaterouter, umpirelookingrouter
} from "./Routes/index.js" //LOOKING ROUTERS
import {
  signuprouter, loginrouter, userrouter, findteamrouter, findplayersrouter, getinningsrouter, addteamrouter, creatematchrouter, createinningsrouter, secondinningsrouter, updateinningsrouter, createoverrouter, updateoverrouter, createbatterrouter, createbowlerrouter, updatebatterperformacerouter, updatebowlerperformacerouter
} from "./Routes/index.js"; //MYCRICKET ROUTES


const app = express();
dotenv.config();

// *** IMPORTANT: Add this line here ***
app.set('trust proxy', 1); // Trust the first proxy in front of the app (Render's load balancer)

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// CORS configuration (already looks good, just confirming placement)
app.use(cors({
  origin: "https://cricketscorecardapp-website.onrender.com", // Make sure this is your exact frontend URL
  credentials: true
}));

app.use(cookieParser()); // Cookie parser should be after express.json and express.urlencoded

app.use((req, res, next) => {
  // Good for debugging: will show the actual protocol
  console.log(`Request Path: ${req.path}, Method: ${req.method}, Protocol: ${req.protocol}`);
  next();
});

const port = process.env.PORT || 4000;
const URL = process.env.MONGO_PASS;

// MongoDB connection
mongoose.connect(URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection failed:", err.message);
    // Exit the process if DB connection fails, as the app won't work without it
    process.exit(1);
  });

// Routes
app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/hi", (req, res) => {
  res.send("Hi");
});

// Test cookie route - also needs secure and samesite for Render test
app.get('/test-cookie', (req, res) => {
  res.cookie("test", "value", {
    httpOnly: true,
    secure: true,   // Add secure: true
    sameSite: "None", // Add sameSite: "None"
    domain: '.onrender.com' // Add domain
  });
  res.send("Cookie set");
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
app.use('/api/signupform', signuprouter)
app.use('/api/loginform', loginrouter)
app.use('/api/user', userrouter)
app.use('/api/authstatus', authstatusrouter)
app.use('/api/findteam', findteamrouter)
app.use('/api/findplayers', findplayersrouter)
app.use('/api/addteam', addteamrouter)
app.use('/api/creatematch', creatematchrouter)
app.use('/api', createinningsrouter)
app.use('/api', getinningsrouter)
app.use('/api/matches', secondinningsrouter)
app.use('/api', updateinningsrouter)
app.use('/api/innings', createoverrouter)
app.use('/api', updateoverrouter)
app.use('/api/innings', createbatterrouter)
app.use('/api/innings', createbowlerrouter)
app.use('/api', updatebatterperformacerouter)
app.use('/api', updatebowlerperformacerouter)


// Start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
