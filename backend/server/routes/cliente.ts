import { Router } from "express";
import { ClienteService } from "../db/services/cliente";
import { clienteRules } from "../validation/cliente";
import { validator } from "../validation/utils";
import { errorHandler } from "./utils";
import { ClienteCreateModel, ClienteFilterModel } from "../db/dto/cliente";
import { authorizeGuida } from "../auth/auth";

export const routerCliente = Router();
const service = new ClienteService();

routerCliente.post(
  '/register', 
  // validator(clienteRules.forRegister),
  authorizeGuida,
  (req, res, next) => {
    service.register(ClienteCreateModel.fromDict(req.body))
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerCliente.get(
  '/details/:id',
  authorizeGuida,
  (req, res, next) => {
    service.getDetails(Number(req.params.id))
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerCliente.get(
  '/',
  authorizeGuida,
  (req, res, next) => {
    service.getAll(new ClienteFilterModel(req.query))
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerCliente.use(errorHandler);