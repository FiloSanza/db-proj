import { Router } from "express";
import { ViaggioCreateModel } from "../db/dto/viaggioDto";
import { ViaggioService } from "../db/services/viaggio";
import { validator } from "../validation/utils";
import { viaggioRules } from "../validation/viaggio";
import { errorHandler } from "./utils";

export const routerViaggio = Router();
const service = new ViaggioService();

routerViaggio.post(
  '/create', 
  validator(viaggioRules.forCreate), 
  (req, res, next) => {
    let dto = req.body as ViaggioCreateModel;
    service.create(dto)
    .then(results => res.send(results))
    .catch(err => next(err));
  }
)
  
routerViaggio.get(
  '/',
  (req, res, next) => {
    let filter = req.query as Record<string, any>;
    service.getAll(filter)
    .then(results => res.send(results))
    .catch(err => next(err));
  }
)

routerViaggio.use(errorHandler);