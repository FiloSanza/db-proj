import { Router } from "express";
import { authorizeGuida, authorizeUser } from "../auth/auth";
import { TagCreateModel, TagFilterModel } from "../db/dto/tag";
import { TagService } from "../db/services/tag";
import { tagRules } from "../validation/tag";
import { validator } from "../validation/utils";
import { errorHandler } from "./utils";

export const routerTag = Router();
const service = new TagService();

routerTag.post(
  '/create',
  validator(tagRules.forCreate), 
  authorizeGuida,
  (req, res, next) => {;
    service.create(TagCreateModel.fromDict(req.body))
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerTag.get(
  '/details/:id',
  authorizeUser,
  (req, res, next) => {
    service.getViaggi(Number(req.params.id))
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerTag.get(
  '/',
  authorizeUser,
  (req, res, next) => {
    service.getAll(new TagFilterModel(req.query))
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerTag.use(errorHandler);