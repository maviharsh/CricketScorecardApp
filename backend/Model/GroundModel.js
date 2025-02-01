import { model } from "mongoose";
import {GroundSchema} from "../Schemas/GroundSchema.js";

export const GroundModel=new model("ground",GroundSchema);