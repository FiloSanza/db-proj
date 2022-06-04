import { body } from "express-validator";

export const aggiuntaRules = {
  forCreate: [
    body("descrizione")
      .exists()
      .isString(),
    body("prezzo")
      .exists()
      .isNumeric(),
    body("aggiuntaVisita")
      .exists()
      .isBoolean()
  ]
}