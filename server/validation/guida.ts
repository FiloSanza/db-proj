import { body } from "express-validator";

export const guidaRules = {
  forRegister: [
    body("nome")
      .isAlpha(),
    body("cognome")
      .isAlpha(),
    body("dataNascita")
      .isDate(),
    body("email")
      .isEmail()
  ]
}