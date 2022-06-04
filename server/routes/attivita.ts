import { Router } from "express";
import { AttivitaCreateModel } from "../db/dto/attivitaDto";
import { AttivitaService } from "../db/services/attivita";
import { attivitaRules } from "../validation/attivita";
import { validator } from "../validation/utils";
import { errorHandler } from "./utils";

export const routerAttivita = Router();
const service = new AttivitaService();

routerAttivita.post(
  '/create', 
  validator(attivitaRules.forCreate), 
  (req, res, next) => {
    let dto = req.body as AttivitaCreateModel;
    service.create(dto)
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerAttivita.get(
  '/',
  (req, res, next) => {
    let filter = req.query as Record<string, any>;
    service.getAll(filter)
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerAttivita.use(errorHandler);