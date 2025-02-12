import {model} from 'mongoose';
import {PlayerForTeamSchema} from "../../Schemas/LookingSchemas/PlayerForTeam.js";

export const PlayerForTeamModel=model("playerforteam",PlayerForTeamSchema);
