import { body } from "express-validator";

export const tagRules = {
  forCreate: [
    body("descrizione")
      .exists()
      .isAlpha()
      .isLength({min: 3})
  ]
}