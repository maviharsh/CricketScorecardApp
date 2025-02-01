import { model } from "mongoose";
import { StreamerSchema } from "../Schemas/StreamerSchema.js";

export const StreamerModel=new model("streamer",StreamerSchema);