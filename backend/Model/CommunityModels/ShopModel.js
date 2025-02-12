import { model } from "mongoose";
import { ShopSchema } from "../../Schemas/CommunitySchemas/ShopSchema.js";

export const ShopModel=model("shop",ShopSchema);