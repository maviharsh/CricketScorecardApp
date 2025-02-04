import { model } from "mongoose";
import { UmpireSchema } from "../Schemas/UmpireSchema.js";

export const UmpireModel=model("umpire",UmpireSchema);