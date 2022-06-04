import { Router } from "express"
import { routerAttivita } from "./attivita";
import { routerCitta } from "./citta";
import { routerCliente } from "./cliente";
import { routerGuida } from "./guida";
import { routerTag } from "./tag";
import { routerViaggio } from "./viaggio";

export const router = Router();

router.use('/attivita', routerAttivita);
router.use('/viaggio', routerViaggio);
router.use('/cliente', routerCliente);
router.use('/guida', routerGuida);
router.use('/citta', routerCitta);
router.use('/tag', routerTag)