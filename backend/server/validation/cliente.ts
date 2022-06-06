import { body } from "express-validator";

export const clienteRules = {
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