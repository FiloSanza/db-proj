import { Router } from "express";
import { GuidaCreateModel, GuidaFilterModel } from "../db/dto/guida";
import { GuidaService } from "../db/services/guida";
import { guidaRules } from "../validation/guida";
import { validator } from "../validation/utils";
import { errorHandler } from "./utils";

export const routerGuida = Router();
const service = new GuidaService();

routerGuida.post(
  '/register', 
  validator(guidaRules.forRegister), 
  (req, res, next) => {
    service.register(GuidaCreateModel.fromDict(req.body))
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerGuida.get(
  '/',
  (req, res, next) => {
    service.getAll(new GuidaFilterModel(req.query))
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerGuida.use(errorHandler);