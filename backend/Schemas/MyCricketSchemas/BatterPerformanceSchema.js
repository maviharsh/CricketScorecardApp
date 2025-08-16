import mongoose, { Schema } from "mongoose";

export const BatterPerformanceSchema = new Schema({
    matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'match', required: true },
    inningId: { type: mongoose.Schema.Types.ObjectId, ref: 'innings', required: true },
    playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    playerName: { type: String, required: true },
    runs: { type: Number, default: 0 },
    ballsFaced: { type: Number, default: 0 },
    fours: { type: Number, default: 0 },
    sixes: { type: Number, default: 0 },
    strikeRate: { type: Number, default: 0 },
    battingOrder: { type: Number, required: true },
    onStrike: { type: Boolean, default: false },

    isOut: { type: Boolean, default: false },
    outDetails: {
        type: { type: String }, 
        bowlerId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        fielderId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    }
}, { timestamps: true });