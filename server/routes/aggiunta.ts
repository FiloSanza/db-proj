import { Router } from "express";
import { AggiuntaCreateModel, AggiuntaFilterModel } from "../db/dto/aggiuntaDto";
import { AggiuntaService } from "../db/services/aggiunta";
import { aggiuntaRules } from "../validation/aggiunta";
import { validator } from "../validation/utils";
import { errorHandler } from "./utils";

export const routerAggiunta = Router();
const service = new AggiuntaService();

routerAggiunta.post(
  '/create', 
  validator(aggiuntaRules.forCreate), 
  (req, res, next) => {
    let dto = AggiuntaCreateModel.fromDict(req.body);
    service.create(dto)
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerAggiunta.get(
  '/',
  (req, res, next) => {
    service.getAll(new AggiuntaFilterModel(req.query))
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerAggiunta.use(errorHandler);