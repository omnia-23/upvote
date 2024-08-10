import Joi from "joi";
import { gender } from "../../types/gender.enum.js";


export const createUserVal = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  gender: Joi.string().valid(...Object.values(gender)),
  password: Joi.string().required(),
}).required();
