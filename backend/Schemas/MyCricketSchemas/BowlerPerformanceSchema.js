import mongoose, { Schema } from "mongoose";

export const BowlerPerformanceSchema = new Schema({
    matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'match', required: true },
    inningId: { type: mongoose.Schema.Types.ObjectId, ref: 'innings', required: true },
    playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    playerName: { type: String, required: true },

    ballsBowled: { type: Number, default: 0 },
    
    
    maidens: { type: Number, default: 0 },
    runsConceded: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    noBalls: { type: Number, default: 0 },
    wides: { type: Number, default: 0 },
    economy: { type: Number, default: 0 },
}, { timestamps: true });