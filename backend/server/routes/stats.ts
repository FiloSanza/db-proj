import { Router } from "express";
import { authorizeGuida } from "../auth/auth";
import { StatsService } from "../db/services/stats";
import { errorHandler } from "./utils";

export const routerStats = Router();
const service = new StatsService();

routerStats.get(
  '/',
  authorizeGuida,
  (req, res, next) => {
    service.get()
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerStats.use(errorHandler);