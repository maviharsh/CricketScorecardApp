import mongoose,{Schema} from "mongoose";

export const OverSchema = new Schema({
  matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
  inningId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inning', required: true },
  overNumber: { type: Number, required: true },
  bowlerId: { type: String, required: true }, // Bowler name for now
  runs: { type: Number, default: 0 },
  deliveries: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});