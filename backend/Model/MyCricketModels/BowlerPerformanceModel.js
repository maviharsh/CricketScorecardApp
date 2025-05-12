import {model} from 'mongoose';
import {BowlerPerformanceSchema} from "../../Schemas/MyCricketSchemas/BowlerPerformanceSchema.js";

export const BowlerPerformance=model("BowlerPerformance",BowlerPerformanceSchema);
