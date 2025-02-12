import { model } from "mongoose";
import { ScorerSchema } from "../../Schemas/CommunitySchemas/ScorerSchema.js";

export const ScorerModel=model("scorer",ScorerSchema);