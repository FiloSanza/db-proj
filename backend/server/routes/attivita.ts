import { Router } from "express";
import { authorizeGuida, authorizeUser } from "../auth/auth";
import { AttivitaCreateModel, AttivitaFilterModel } from "../db/dto/attivita";
import { AttivitaService } from "../db/services/attivita";
import { attivitaRules } from "../validation/attivita";
import { validator } from "../validation/utils";
import { errorHandler } from "./utils";

export const routerAttivita = Router();
const service = new AttivitaService();

routerAttivita.post(
  '/create', 
  validator(attivitaRules.forCreate),
  authorizeGuida,
  (req, res, next) => {
    let dto = AttivitaCreateModel.fromDict(req.body);
    service.create(dto)
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerAttivita.get(
  '/',
  authorizeUser,
  (req, res, next) => {
    service.getAll(new AttivitaFilterModel(req.query))
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerAttivita.use(errorHandler);