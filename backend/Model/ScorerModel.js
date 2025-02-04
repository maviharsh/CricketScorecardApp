import { model } from "mongoose";
import { ScorerSchema } from "../Schemas/ScorerSchema.js";

export const ScorerModel=model("scorer",ScorerSchema);