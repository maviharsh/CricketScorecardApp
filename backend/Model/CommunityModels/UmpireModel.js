import { model } from "mongoose";
import { UmpireSchema } from "../../Schemas/CommunitySchemas/UmpireSchema.js";

export const UmpireModel=model("umpire",UmpireSchema);