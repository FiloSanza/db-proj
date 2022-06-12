import { Router } from "express";
import { ClienteFilterModel } from "../db/dto/cliente";
import { GuidaFilterModel } from "../db/dto/guida";
import { ClienteService } from "../db/services/cliente";
import { GuidaService } from "../db/services/guida";

export const loginRouter = Router();

const serviceClienti = new ClienteService();
const serviceGuida = new GuidaService();

loginRouter.post(
  '/loginCliente',
  //TODO: validate,
  async (req, res) => {
    let email = req.body.email;
    let users = await serviceClienti.getAll(new ClienteFilterModel({Email: email}));
    console.log(users, email);
    if (users.length === 0) {
      res.status(401).send('Unauthorized');
    } else {
      res.cookie('cliente', email, {
        secure: true,
        sameSite: 'none'
      });
      res.status(200).send('');
    }
  }
  )

  loginRouter.post(
    '/loginGuida',
    //TODO: validate,
    async (req, res) => {
      let email = req.body.email;
      let users = await serviceGuida.getAll(new GuidaFilterModel({Email: email}));
      if (users.length === 0) {
        res.status(401).send('Unauthorized');
      } else {
        res.cookie('guida', email, {
          secure: true,
          sameSite: 'none'
        });
        res.status(200).send('');
      }
    }
)

loginRouter.post(
  '/logout',
  (req, res) => {
    res.clearCookie('guida');
    res.clearCookie('utente');
    res.status(200);
  }
)