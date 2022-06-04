import { body } from "express-validator";

export const viaggioRules = {
  forCreate: [
    body("visite")
      .exists()
      .isArray(),
    body("giornate")
      .exists()
      .isArray(),
    body("descrizione")
      .exists()
      .isString()
      .isLength({min: 3}),
    body("periodo")
      .exists(),
    body("periodo.giornoInizio")
      .exists()
      .isNumeric(),
    body("periodo.giornoFine")
      .exists()
      .isNumeric(),
    body("periodo.meseInizio")
      .exists()
      .isNumeric(),
    body("periodo.meseFine")
      .exists()
      .isNumeric(),
    body("giornate.*.descrizione")
      .exists()
      .isString()
      .isLength({min: 3}),
    body("giornate.*.numero")
      .exists()
      .isNumeric(),
    body("visite.*.idAttivita")
      .isNumeric(),
    body("visite.*.ora")
      .isNumeric(),
    body("visite.*.numeroGiornata")
      .isNumeric(),
  ]
}