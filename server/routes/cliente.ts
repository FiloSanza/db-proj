import { Router } from "express";
import { ClienteService } from "../db/services/cliente";
import { clienteRules } from "../validation/cliente";
import { validator } from "../validation/utils";
import { errorHandler } from "./utils";
import { ClienteRegistrationModel } from "../db/dto/clienteDto";

export const routerCliente = Router();
const service = new ClienteService();

routerCliente.post(
  '/register', 
  validator(clienteRules.forRegister), 
  (req, res, next) => {
    let dto = req.body as ClienteRegistrationModel;
    service.register(dto)
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerCliente.get(
  '/',
  (req, res, next) => {
    let filter = req.query as Record<string, any>;
    if ('IdCliente' in filter) {
      filter.IdCliente = Number(filter.IdCliente);
    }
    service.getAll(filter)
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerCliente.use(errorHandler);