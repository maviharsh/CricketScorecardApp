import {model} from 'mongoose';
import {UmpireLookingSchema} from "../../Schemas/LookingSchemas/UmpireLookingSchema.js";

export const UmpireLookingModel=model("umpirelooking",UmpireLookingSchema);
