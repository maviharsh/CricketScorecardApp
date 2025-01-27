import {model} from 'mongoose';
import {CoachSchema} from "../Schemas/CoachSchema.js";

export const CoachModel=model("coach",CoachSchema);
