import { Router } from "express"
import { routerAggiunta } from "./aggiunta";
import { routerAttivita } from "./attivita";
import { loginRouter } from "./auth";
import { routerCitta } from "./citta";
import { routerCliente } from "./cliente";
import { routerDataViaggio } from "./dataviaggio";
import { routerGuida } from "./guida";
import { routerPrenotazione } from "./prenotazione";
import { routerRecensione } from "./recensione";
import { routerTag } from "./tag";
import { routerViaggio } from "./viaggio";
import { routerStats } from "./stats";

export const router = Router();

router.use('/prenotazione', routerPrenotazione);
router.use('/dataviaggio', routerDataViaggio);
router.use('/recensione', routerRecensione);
router.use('/attivita', routerAttivita);
router.use('/aggiunta', routerAggiunta);
router.use('/viaggio', routerViaggio);
router.use('/cliente', routerCliente);
router.use('/guida', routerGuida);
router.use('/citta', routerCitta);
router.use('/stats', routerStats);
router.use('/auth', loginRouter);
router.use('/tag', routerTag);
