import { Router } from "express";
import { AggiuntaCreateModel, AggiuntaFilterModel } from "../db/dto/aggiunta";
import { AggiuntaService } from "../db/services/aggiunta";
import { aggiuntaRules } from "../validation/aggiunta";
import { validator } from "../validation/utils";
import { errorHandler } from "./utils";
import { authorizeGuida, authorizeUser } from "../auth/auth";

export const routerAggiunta = Router();
const service = new AggiuntaService();

routerAggiunta.post(
  '/create', 
  validator(aggiuntaRules.forCreate), 
  authorizeGuida,
  (req, res, next) => {
    let dto = AggiuntaCreateModel.fromDict(req.body);
    service.create(dto)
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerAggiunta.get(
  '/',
  authorizeUser,
  (req, res, next) => {
    service.getAll(new AggiuntaFilterModel(req.query))
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerAggiunta.use(errorHandler);