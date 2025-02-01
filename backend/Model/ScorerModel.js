import { model } from "mongoose";
import { ScorerSchema } from "../Schemas/ScorerSchema.js";

export const ScorerModel=new model("scorer",ScorerSchema);