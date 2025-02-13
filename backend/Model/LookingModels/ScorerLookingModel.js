import {model} from 'mongoose';
import {ScorerLookingSchema} from "../../Schemas/LookingSchemas/ScorerLookingSchema.js";

export const ScorerLookingModel=model("scorerlooking",ScorerLookingSchema);
