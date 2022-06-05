import { Router } from "express"
import { routerAggiunta } from "./aggiunta";
import { routerAttivita } from "./attivita";
import { routerCitta } from "./citta";
import { routerCliente } from "./cliente";
import { routerDataViaggio } from "./dataviaggio";
import { routerGuida } from "./guida";
import { routerPrenotazione } from "./prenotazione";
import { routerTag } from "./tag";
import { routerViaggio } from "./viaggio";

export const router = Router();

router.use('/prenotazione', routerPrenotazione);
router.use('/dataviaggio', routerDataViaggio);
router.use('/attivita', routerAttivita);
router.use('/aggiunta', routerAggiunta);
router.use('/viaggio', routerViaggio);
router.use('/cliente', routerCliente);
router.use('/guida', routerGuida);
router.use('/citta', routerCitta);
router.use('/tag', routerTag)