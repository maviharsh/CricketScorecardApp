import {model} from 'mongoose';
import {CoachSchema} from "../../Schemas/CommunitySchemas/CoachSchema.js";

export const CoachModel=model("coach",CoachSchema);
