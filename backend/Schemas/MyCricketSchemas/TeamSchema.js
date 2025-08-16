import mongoose, { Schema } from "mongoose";

export const TeamSchema = new Schema({
    teamname: {
        type: String,
        required: true,
        unique: true
    },
    city: {
        type: String,
        required: true
    },
    captainId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // ✅ FIXED
        required: true
    },
    players: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }], // ✅ FIXED
        validate: [ (val) => val.length >= 2, 'A team must have at least 11 players']
    }
}, { timestamps: true });