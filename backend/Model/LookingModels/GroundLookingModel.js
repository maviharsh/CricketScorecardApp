import {model} from 'mongoose';
import {GroundLookingSchema} from "../../Schemas/LookingSchemas/GroundLookingSchema.js";

export const GroundLookingModel=model("groundlooking",GroundLookingSchema);
