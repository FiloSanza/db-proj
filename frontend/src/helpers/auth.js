import Cookies from "js-cookie"

export const isUserLogged = () =>
  isGuidaLogged() || isClienteLogged();

export const isGuidaLogged = () => 
  Cookies.get('guida') !== undefined

export const isClienteLogged = () => 
  Cookies.get('cliente') !== undefined