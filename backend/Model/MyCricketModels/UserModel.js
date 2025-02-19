import {model} from 'mongoose';
import {UserSchema} from "../../Schemas/MyCricketSchemas/UserSchema.js";

export const User=model("user",UserSchema);
