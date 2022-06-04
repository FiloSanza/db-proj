import { body } from "express-validator";

export const cittaRules = {
  forCreate: [
    body("nome")
      .exists()
      .isAlphanumeric()
  ]
}