import { Router } from "express";
import { authorizeGuida, authorizeUser } from "../auth/auth";
import { DataViaggioCreateModel, DataViaggioFilterModel } from "../db/dto/dataviaggio";
import { DataViaggioService } from "../db/services/dataviaggio";
import { dataViaggioRules } from "../validation/dataviaggio";
import { validator } from "../validation/utils";
import { errorHandler } from "./utils";

export const routerDataViaggio = Router();
const service = new DataViaggioService();

routerDataViaggio.post(
  '/create',
  authorizeGuida,
  validator(dataViaggioRules.forCreate), 
  (req, res, next) => {
    service.create(DataViaggioCreateModel.fromDict(req.body))
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerDataViaggio.get(
  '/',
  authorizeUser,
  (req, res, next) => {
    service.getAll(new DataViaggioFilterModel(req.query))
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerDataViaggio.use(errorHandler);