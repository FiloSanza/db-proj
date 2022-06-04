import { Router } from "express";
import { TagCreateModel } from "../db/dto/tagDto";
import { TagService } from "../db/services/tag";
import { tagRules } from "../validation/tag";
import { validator } from "../validation/utils";
import { errorHandler } from "./utils";

export const routerTag = Router();
const service = new TagService();

routerTag.post(
  '/create',
  validator(tagRules.forCreate), 
  (req, res, next) => {
    let dto = req.body as TagCreateModel;
    service.create(dto)
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerTag.get(
  '/',
  (req, res, next) => {
    let filter = req.query as Record<string, any>;
    service.getAll(filter)
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerTag.use(errorHandler);