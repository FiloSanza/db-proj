import { Router } from "express";
import { authorizeCliente, authorizeUser } from "../auth/auth";
import { RecensioneCreateModel, RecensioneFilterModel } from "../db/dto/recensione";
import { RecensioneService } from "../db/services/recensione";
import { validator } from "../validation/utils";
import { errorHandler } from "./utils";

export const routerRecensione = Router();
const service = new RecensioneService();

routerRecensione.post(
  '/create', 
//TODO: validate,
  authorizeCliente,
  (req, res, next) => {
    service.create(RecensioneCreateModel.fromDict(req.body))
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerRecensione.get(
  '/',
  authorizeUser,
  (req, res, next) => {
    service.getAll(new RecensioneFilterModel(req.query))
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerRecensione.use(errorHandler);