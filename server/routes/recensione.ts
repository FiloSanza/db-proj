import { Router } from "express";
import { RecensioneCreateModel, RecensioneFilterModel } from "../db/dto/recensione";
import { RecensioneService } from "../db/services/recensione";
import { validator } from "../validation/utils";
import { errorHandler } from "./utils";

export const routerRecensione = Router();
const service = new RecensioneService();

routerRecensione.post(
  '/create', 
//TODO: validate,
  (req, res, next) => {
    service.create(RecensioneCreateModel.fromDict(req.body))
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerRecensione.get(
  '/',
  (req, res, next) => {
    service.getAll(new RecensioneFilterModel(req.query))
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerRecensione.use(errorHandler);