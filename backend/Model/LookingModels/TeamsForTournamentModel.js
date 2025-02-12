import {model} from 'mongoose';
import {TeamsForTournamentSchema} from "../../Schemas/LookingSchemas/TeamsForTournamentSchema.js";

export const TeamsForTournamentModel=model("teamsfortournament",TeamsForTournamentSchema);
