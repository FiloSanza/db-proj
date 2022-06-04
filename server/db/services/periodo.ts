import { PeriodoViaggio } from "../dto/viaggioDto";
import { prismaClient } from "./utils";

export class PeriodoViaggioService {
  private readonly _prisma = prismaClient;
  
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