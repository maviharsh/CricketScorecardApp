import mongoose, { Schema } from "mongoose";

export const BatterPerformanceSchema = new Schema({
  matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
  inningId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inning', required: true },
  playerId: { type: String, required: true }, // Player name for now
  runs: { type: Number, default: 0 },
  balls: { type: Number, default: 0 },
  fours: { type: Number, default: 0 },
  sixes: { type: Number, default: 0 },
  strikeRate: { type: Number, default: 0 },
  battingOrder: { type: Number, required: true },
  battingStatus: { type: String, enum: ['batting', 'out'], default: 'batting' },
  outType: { type: String, enum: ['catch', 'stump', 'hit_wicket', 'bold', 'run_out'] },
  onStrike: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

