import {model} from 'mongoose';
import {MatchSchema} from "../../Schemas/MyCricketSchemas/MatchSchema.js";

export const Match=model("match",MatchSchema);
