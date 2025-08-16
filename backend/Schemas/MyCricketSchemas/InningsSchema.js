import mongoose, { Schema } from "mongoose";

export const InningsSchema = new Schema({
    matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
    inningNumber: { type: Number, enum: [1, 2], required: true },
    battingTeamId: { type: mongoose.Schema.Types.ObjectId, ref: 'team', required: true },
    bowlingTeamId: { type: mongoose.Schema.Types.ObjectId, ref: 'team', required: true },
    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    overs: { type: Number, default: 0 },
    balls: { type: Number, default: 0 },

    // ✅ CORRECTED AND COMPLETED EXTRA OBJECT
    extra: {
        total: { type: Number, default: 0 },
        wides: { type: Number, default: 0 },   // Corrected to plural 'wides'
        noBalls: { type: Number, default: 0 }, // Corrected to plural 'noBalls'
        byes: { type: Number, default: 0 },    // Added for completeness
        legByes: { type: Number, default: 0 }  // Added for completeness
    },

    batters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BatterPerformance' }],
    bowlers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BowlerPerformance' }],
    oversList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Over' }],
    status: { type: String, enum: ['ongoing', 'completed'], default: 'ongoing' },
}, { timestamps: true });

export const Innings = mongoose.model("Innings", InningsSchema);