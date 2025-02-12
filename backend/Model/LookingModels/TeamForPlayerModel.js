import {model} from 'mongoose';
import {TeamForPlayerSchema} from "../../Schemas/LookingSchemas/TeamForPlayer.js";

export const TeamForPlayerModel=model("teamforplayer",TeamForPlayerSchema);
