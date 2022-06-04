import { Router } from "express";
import { AggiuntaCreateModel } from "../db/dto/aggiunta";
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
    let dto = req.body as AggiuntaCreateModel;
    service.create(dto)
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerAggiunta.get(
  '/',
  (req, res, next) => {
    let filter = req.query as Record<string, any>;
    service.getAll(filter)
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerAggiunta.use(errorHandler);