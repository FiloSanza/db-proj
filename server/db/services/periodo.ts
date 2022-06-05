import { PeriodoViaggio } from "../dto/viaggioDto";
import { BaseService } from "./base";

export class PeriodoViaggioService extends BaseService {  
  getAll(filter: PeriodoViaggio) {
    return this._prisma.periodo.findMany({
      where: {
        MeseInizio: filter.meseInizio,
        MeseFine: filter.meseFine,
        GiornoInizio: filter.giornoInizio,
        GiornoFine: filter.giornoFine
      }
    });
  }
}