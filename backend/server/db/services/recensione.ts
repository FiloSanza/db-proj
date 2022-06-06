import { RecensioneCreateModel, RecensioneFilterModel } from "../dto/recensione";
import { BaseService } from "./base";

export class RecensioneService extends BaseService {
  async create(data: RecensioneCreateModel) {
    let dataViaggio = await this._prisma.prenotazione.findUnique({
      where: { IdPrenotazione: data.idPrenotazione },
      select: {
        DataViaggio: {
          select: {
            DataPartenza: true
          }
        }
      }
    });

    if (new Date().getTime() < dataViaggio.DataViaggio.DataPartenza.getTime()) {
      throw new Error("Non puoi recensire un viaggio prima di prenderne parte");
    }

    return this._prisma.recensione.create({
      data: {
        Valutazione: data.valutazione,
        DataPubblicazione: data.dataPubblicazione,
        Descrizione: data.descrizione,
        Prenotazione: {
          connect: { IdPrenotazione: data.idPrenotazione }
        }
      }
    });
  }
  
  getAll(filter: RecensioneFilterModel) {
    return this._prisma.recensione.findMany({
      where: filter.getFilterDict()
    });
  }

  getAllForViaggio(idViaggio: number) {
    return this._prisma.recensione.findMany({
      where: {
        Prenotazione: {
          DataViaggio: {
            IdViaggio: idViaggio
          }
        }
      },
      include: {
        Prenotazione: {
          include: {
            DataViaggio: true,
            Cliente: true
          }
        }
      }
    })
  }
}