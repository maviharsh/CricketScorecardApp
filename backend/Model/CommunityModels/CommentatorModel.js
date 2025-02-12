import { model } from "mongoose";
import {CommentatorSchema} from "../../Schemas/CommunitySchemas/CommentatorSchema.js";

export const CommentatorModel= model("commentator",CommentatorSchema);