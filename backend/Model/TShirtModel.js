import { model } from "mongoose";
import { TShirtSchema } from "../Schemas/TShirtSchema.js";

export const TShirtModel=new model("tshirt",TShirtSchema);