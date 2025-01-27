import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";
import { CoachModel } from "./Model/CoachModel.js";
import path from "path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.json());
app.use(cors());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT || 4000;
const URL = process.env.MONGO_PASS;

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(
            null,
            new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname
        );
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

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

app.post("/api/coachform", upload.single('photo'), (req, res) => {
    const coach = req.body;
    const newCoach = new CoachModel({
        name: coach.name,
        city: coach.city,
        feesPM: coach.feesPM,
        feesPD: coach.feesPD,
        contact: coach.contact,
        photo: req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename,
    });

    newCoach.save()
        .then((savedCoach) => {
            res.json(savedCoach);
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send("Error saving coach");
        });
});

app.get("/api/coachform", (req, res) => {
    CoachModel.find({})
        .then((coaches) => {
            res.send(coaches);
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send("Error fetching coaches");
        });
});

// Start server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
