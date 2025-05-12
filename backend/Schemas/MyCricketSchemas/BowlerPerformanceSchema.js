import mongoose, { Schema } from "mongoose";

export const BowlerPerformanceSchema = new Schema({
  matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
  inningId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inning', required: true },
  playerId: { type: String, required: true }, // Player name for now
  overs: { type: Number, default: 0 },
  maidens: { type: Number, default: 0 },
  runs: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  noBalls: { type: Number, default: 0 },
  wides: { type: Number, default: 0 },
  economy: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

