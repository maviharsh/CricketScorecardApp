import mongoose, { Schema } from "mongoose";

export const InningsSchema = new Schema({
  matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
  inningNumber: { type: Number, enum: [1, 2], required: true },
  battingTeamId: { type: String, required: true }, // Team name for now
  bowlingTeamId: { type: String, required: true },
  runs: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  overs: { type: Number, default: 0 },
  balls: { type: Number, default: 0 },
  extras: {
    total: { type: Number, default: 0 },
    wide: { type: Number, default: 0 },
    noBall: { type: Number, default: 0 },
  },
  batters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BatterPerformance' }],
  bowlers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BowlerPerformance' }],
  oversList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Over' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

