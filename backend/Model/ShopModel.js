import { model } from "mongoose";
import { ShopSchema } from "../Schemas/ShopSchema.js";

export const ShopModel=model("shop",ShopSchema);