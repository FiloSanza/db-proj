import { DataViaggioCreateModel } from "../dto/dataviaggio";
import { prismaClient } from "./utils";

export class DataViaggioService {
  private readonly _prisma = prismaClient;
  
  create(data: DataViaggioCreateModel) {
    return this._prisma.dataViaggio.create({
      data: {
        DataPartenza: new Date(data.dataPartenza),
        Posti: data.posti,
        PrezzoBase: data.prezzoBase,
        Sconto: {
          connectOrCreate: {
            where: {
              Percentuale: data.sconto
            },
            create: {
              Percentuale: data.sconto
            }
          }
        },
        Guida: {
          connect: { IdGuida: data.idGuida }
        },
        Viaggio: {
          connect: { IdViaggio: data.idViaggio }
        }
      }
    });
  }
  
  getAll(filter: Record<string, any> = {}) {
    return this._prisma.dataViaggio.findMany({
      where: filter,
      include: {
        Viaggio: true,
        Sconto: true,
        Guida: true
      }
    })
    .then(results => {
      return results.map(result => ({
        descrizione: result.Viaggio.Descrizione,
        dataPartenza: result.DataPartenza,
        posti: result.Posti,
        sconto: result.Sconto.Percentuale,
        guida: result.Guida.Email,
        prezzoBase: result.PrezzoBase
      }));
    });
  }
}