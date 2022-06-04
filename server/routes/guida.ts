import { Router } from "express";
import { GuidaRegistrationModel } from "../db/dto/guidaDto";
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
    let dto = req.body as GuidaRegistrationModel;
    service.register(dto)
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerGuida.get(
  '/',
  (req, res, next) => {
    let filter = req.query as Record<string, any>;
    if ('IdGuida' in filter) {
      filter.IdGuida = Number(filter.IdGuida);
    }
    service.getAll(filter)
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerGuida.use(errorHandler);