import { Router } from "express";
import { PrenotazioneCreateModel } from "../db/dto/prenotazione";
import { PrenotazioneService } from "../db/services/prenotazione";
import { validator } from "../validation/utils";
import { errorHandler } from "./utils";

export const routerPrenotazione = Router();
const service = new PrenotazioneService();

routerPrenotazione.post(
  '/create', 
  //TODO: VALIDATE
  (req, res, next) => {
    let dto = req.body as PrenotazioneCreateModel;
    service.create(dto)
    .then(results => res.send(results))
    .catch(err => next(err));
})

routerPrenotazione.get(
  '/',
  (req, res, next) => {
    let filter = req.query as Record<string, any>;
    service.getAll(filter)
    .then(results => res.send(results))
    .catch(err => next(err));
})
  
routerPrenotazione.use(errorHandler);