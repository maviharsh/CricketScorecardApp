import { model } from "mongoose";
import { TShirtSchema } from "../../Schemas/CommunitySchemas/TShirtSchema.js";

export const TShirtModel=model("tshirt",TShirtSchema);