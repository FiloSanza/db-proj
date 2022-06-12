import { Router } from "express";
import { ClienteService } from "../db/services/cliente";
import { clienteRules } from "../validation/cliente";
import { validator } from "../validation/utils";
import { errorHandler } from "./utils";
import { ClienteCreateModel, ClienteFilterModel } from "../db/dto/cliente";

export const routerCliente = Router();
const service = new ClienteService();

routerCliente.post(
  '/register', 
  // validator(clienteRules.forRegister), 
  (req, res, next) => {
    service.register(ClienteCreateModel.fromDict(req.body))
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerCliente.get(
  '/',
  (req, res, next) => {
    if ('id' in req.query) {
      service.getDetails(Number(req.query.id))
        .then(results => res.send(results))
        .catch(err => next(err));
    } else {
      service.getAll(new ClienteFilterModel(req.query))
        .then(results => res.send(results))
        .catch(err => next(err));
    }
  }
)

routerCliente.use(errorHandler);