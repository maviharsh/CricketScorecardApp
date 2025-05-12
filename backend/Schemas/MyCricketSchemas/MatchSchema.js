import mongoose, { Schema } from "mongoose";

export const MatchSchema = new Schema({
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
  tossWinner: { type: String }, // Store toss winner team name
  tossDecision: { type: String, enum: ["bat", "bowl"] }, // Store toss decision
  status: {
    type: String,
    enum: ["pending", "ongoing", "completed", "tied"],
    default: "pending",
  },
  team1: {
    type: { type: mongoose.Schema.Types.ObjectId, ref: "TeamSchema" },
  },
  team2: {
    type: { type: mongoose.Schema.Types.ObjectId, ref: "TeamSchema" },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
