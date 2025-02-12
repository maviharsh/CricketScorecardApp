import { model } from "mongoose";
import {GroundSchema} from "../../Schemas/CommunitySchemas/GroundSchema.js";

export const GroundModel=model("ground",GroundSchema);