import {model} from 'mongoose';
import {BatterPerformanceSchema} from "../../Schemas/MyCricketSchemas/BatterPerformanceSchema.js";

export const BatterPerformance=model("BatterPerformance",BatterPerformanceSchema);
