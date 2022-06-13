//Dummy auth just to show app the functionalities for each user
import { ClienteFilterModel } from '../db/dto/cliente';
import { GuidaFilterModel } from '../db/dto/guida';
import { ClienteService } from '../db/services/cliente'
import { GuidaService } from '../db/services/guida'

export async function authorizeCliente(req, res, next) {
  if (!(await _authorizeCliente(req))) {
    res.status(401).send('Unauthorized');
    return;
  } else {
    next();
  }
}

export async function authorizeGuida(req, res, next) {
  if (!(await _authorizeGuida(req))) {
    res.status(401).send('Unauthorized');
    return;
  } else {
    next();
  }
}

export async function authorizeUser(req, res, next) {
  let isGuida = await _authorizeGuida(req);
  let isCliente = await _authorizeCliente(req);

  if (isCliente || isGuida) {
    next();
  } else {
    res.status(401).send('Unauthorized');
    return;
  }
}

async function _authorizeCliente(req) {
  let clienteService = new ClienteService();
  let user = req.cookies.cliente;

  if (!('cliente' in req.cookies)) {
    return false;
  }

  let users = (await clienteService.getAll(new ClienteFilterModel({Email: user})));

  return ((user !== undefined) && (users.length === 1));
}

async function _authorizeGuida(req) {
  let guidaService = new GuidaService();
  let user = req.cookies.guida;

  if (!('guida' in req.cookies)) {
    return false;
  }

  let users = (await guidaService.getAll(new GuidaFilterModel({Email: user})));

  return ((user !== undefined) && (users.length === 1));
}