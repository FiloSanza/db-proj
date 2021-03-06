import { Router } from "express";
import { authorizeGuida, authorizeUser } from "../auth/auth";
import { CittaCreateModel, CittaFilterModel } from "../db/dto/citta";
import { CittaService } from "../db/services/citta";
import { cittaRules } from "../validation/citta";
import { validator } from "../validation/utils";
import { errorHandler } from "./utils";

export const routerCitta = Router();
const service = new CittaService();

routerCitta.post(
  '/create', 
  validator(cittaRules.forCreate),
  authorizeGuida,
  (req, res, next) => {
    let dto = CittaCreateModel.fromDict(req.body);
    service.create(dto)
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerCitta.get(
  '/',
  authorizeUser,
  (req, res, next) => {
    service.getAll(new CittaFilterModel(req.query))
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerCitta.use(errorHandler);