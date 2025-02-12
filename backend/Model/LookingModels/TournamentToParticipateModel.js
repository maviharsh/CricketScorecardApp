import {model} from 'mongoose';
import {TournamentToParticipateSchema} from "../../Schemas/LookingSchemas/TournamentToParticipateSchema.js";

export const TournamentToParticipateModel=model("tournamenttoparticipate",TournamentToParticipateSchema);
