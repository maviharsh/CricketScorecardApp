import { model } from "mongoose";
import {GroundSchema} from "../Schemas/GroundSchema.js";

export const GroundModel=model("ground",GroundSchema);