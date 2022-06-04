import { Router } from "express";
import { CittaCreateModel } from "../db/dto/cittaDto";
import { CittaService } from "../db/services/citta";
import { cittaRules } from "../validation/citta";
import { validator } from "../validation/utils";
import { errorHandler } from "./utils";

export const routerCitta = Router();
const service = new CittaService();

routerCitta.post(
  '/create', 
  validator(cittaRules.forCreate), 
  (req, res, next) => {
    let dto = req.body as CittaCreateModel;
    service.create(dto)
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerCitta.get(
  '/',
  (req, res, next) => {
    let filter = req.query as Record<string, any>;
    service.getAll(filter)
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerCitta.use(errorHandler);