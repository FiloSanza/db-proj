import { Router } from "express";
import { PrenotazioneCreateModel, PrenotazioneFilterModel } from "../db/dto/prenotazione";
import { PrenotazioneService } from "../db/services/prenotazione";
import { validator } from "../validation/utils";
import { errorHandler } from "./utils";

export const routerPrenotazione = Router();
const service = new PrenotazioneService();

routerPrenotazione.post(
  '/create', 
  //TODO: VALIDATE
  (req, res, next) => {
    service.create(PrenotazioneCreateModel.fromDict(req.body))
      .then(results => res.send(results))
      .catch(err => next(err));
})

routerPrenotazione.get(
  '/details/:email',
  (req, res, next) => {
    service.getForCliente(req.params.email)
      .then(results => res.send(results))
      .catch(err => next(err));
  }
)

routerPrenotazione.get(
  '/',
  (req, res, next) => {
    service.getAll(new PrenotazioneFilterModel(req.query))
      .then(results => res.send(results))
      .catch(err => next(err));
})
  
routerPrenotazione.use(errorHandler);