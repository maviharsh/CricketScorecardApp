import mongoose, { Schema } from "mongoose";

export const OverSchema = new Schema({
    matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'match', required: true }, // ✅ FIXED
    inningId: { type: mongoose.Schema.Types.ObjectId, ref: 'innings', required: true }, // ✅ FIXED
    overNumber: { type: Number, required: true },
    bowlerId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }, // ✅ FIXED
    bowlerName: { type: String, required: true },
    runsInOver: { type: Number, default: 0 },
    wicketsInOver: { type: Number, default: 0 },
    deliveries: [{
        type: { type: String, enum: ['run', 'wide', 'noBall', 'wicket'], required: true },
        runs: { type: Number, default: 0 },
        batterId: { type: mongoose.Schema.Types.ObjectId, ref: 'BatterPerformance' },
        bowlerId: { type: mongoose.Schema.Types.ObjectId, ref: 'BowlerPerformance' },
        isExtra: { type: Boolean, default: false },
        isWicket: { type: Boolean, default: false },
        wicketType: { type: String },
        fielderId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, // ✅ FIXED
    }],
}, { timestamps: true });