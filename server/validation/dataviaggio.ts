import { body } from "express-validator";

export const dataViaggioRules = {
  forCreate: [
    body("dataPartenza")
      .exists()
      .isDate(),
    body("posti")
      .exists()
      .isNumeric(),
    body("prezzoBase")
      .exists()
      .isNumeric(),
    body("sconto")
      .exists()
      .isNumeric(),
    body("idGuida")
      .exists()
      .isNumeric(),
    body("idViaggio")
      .exists()
      .isNumeric()
  ]
}