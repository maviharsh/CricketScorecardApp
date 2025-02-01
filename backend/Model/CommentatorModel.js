import { model } from "mongoose";
import { CommentatorSchema } from "../Schemas/CommentatorSchema.js";

export const CommentatorModel=new model("commentator",CommentatorSchema);