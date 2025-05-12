import {model} from 'mongoose';
import {InningsSchema} from "../../Schemas/MyCricketSchemas/InningsSchema.js";

export const Innings=model("innings",InningsSchema);
