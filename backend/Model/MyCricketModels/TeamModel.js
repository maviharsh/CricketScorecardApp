import {model} from 'mongoose';
import {TeamSchema} from "../../Schemas/MyCricketSchemas/TeamSchema.js";

export const Team=model("team",TeamSchema);
