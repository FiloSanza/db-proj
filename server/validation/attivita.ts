import { body } from "express-validator";

export const attivitaRules = {
  forCreate: [
    body("descrizione")
      .exists()
      .isAlphanumeric()
      .isLength({min: 3}),
    body("durata")
      .exists()
      .isNumeric(),
    body("idCitta")
      .exists()
      .isNumeric(),
    body("idTags")
      .exists()
      .isArray()
  ]
}