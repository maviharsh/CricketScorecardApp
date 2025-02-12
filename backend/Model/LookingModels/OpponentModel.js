import {model} from 'mongoose';
import {OpponentSchema} from "../../Schemas/LookingSchemas/OpponentSchema.js";

export const OpponentModel=model("opponent",OpponentSchema);
