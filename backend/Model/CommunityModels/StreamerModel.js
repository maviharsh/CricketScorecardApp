import { model } from "mongoose";
import { StreamerSchema } from "../../Schemas/CommunitySchemas/StreamerSchema.js";

export const StreamerModel=model("streamer",StreamerSchema);