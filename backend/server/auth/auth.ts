//Dummy auth just to show app the functionalities for each user
import { ClienteFilterModel } from '../db/dto/cliente';
import { GuidaFilterModel } from '../db/dto/guida';
import { ClienteService } from '../db/services/cliente'
import { GuidaService } from '../db/services/guida'

export async function validateCliente(req, res, next) {
  let clienteService = new ClienteService();
  let user = req.cookies.cliente;

  if (!('cliente' in req.cookies)) {
    res.status(401).send('Unauthorized');
    return;
  }

  let users = (await clienteService.getAll(new ClienteFilterModel({Email: user})));

  if ((user !== undefined) && (users.length !== 1)) {
    res.status(401).send('Unauthorized');
    return;
  } else {
    next();
  }
}

export async function validateGuida(req, res, next) {
  let guidaService = new GuidaService();
  let user = req.cookies.guida;

  if (!('guida' in req.cookies)) {
    res.status(401).send('Unauthorized');
    return;
  }

  let users = (await guidaService.getAll(new GuidaFilterModel({Email: user})));

  if ((user !== undefined) && (users.length !== 1)) {
    res.status(401).send('Unauthorized');
    return;
  } else {
    next();
  }
}