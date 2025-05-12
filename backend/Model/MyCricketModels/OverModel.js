import {model} from 'mongoose';
import {OverSchema} from "../../Schemas/MyCricketSchemas/OverSchema.js";

export const Over=model("Over",OverSchema);
