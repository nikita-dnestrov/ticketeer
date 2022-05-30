import { body } from "express-validator";

export const authValidation = [
  body("email").exists().isEmail().normalizeEmail(),
  body("password").exists().trim().isLength({ min: 4, max: 20 }),
];
