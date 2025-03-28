import { Schema } from "mongoose";

export const TeamsForTournamentSchema = new Schema(
  {
    name:{
      type:String,
  },
    tournamentname: {
      type: String,
      required: true,
    },
    matcheson: {
      type: Array,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    fees: {
      type: Number,
      required: true,
    },
    totalteams: {
      type: Number,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    image: {
      publicId: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);
