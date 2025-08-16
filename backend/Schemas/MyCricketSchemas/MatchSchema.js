import mongoose, { Schema } from "mongoose";

export const MatchSchema = new Schema({
    team1Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "team",
        required: true,
    },
    team2Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "team",
        required: true,
    },
    maxOvers: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    matchTime: {
        type: String,
        required: true,
    },
    ground: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    tossWinnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "team"
    },
    tossDecision: { type: String, enum: ["bat", "bowl"] },
    // ✅ ADDED: Essential fields for tracking match state and outcome
    status: {
    type: String,
    // Use 'scheduled' instead of 'pending' in the list of options
    enum: ["scheduled", "ongoing", "completed", "tied", "abandoned"],
    // Set the default to 'scheduled'
    default: "scheduled",
    },
    result: {
        type: String,
        default: "Match has not started yet."
    },
    innings: [{ type: mongoose.Schema.Types.ObjectId, ref: "innings" }],
}, { timestamps: true });