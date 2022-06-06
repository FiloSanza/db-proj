import { AggiuntaFilterModel, AggiuntaCreateModel } from "../dto/aggiuntaDto";
import { BaseService } from "./base";

export class AggiuntaService extends BaseService {
  create(data: AggiuntaCreateModel) {
    return this._prisma.aggiunta.create({
      data: {
        Descrizione: data.descrizione,
        Prezzo: data.prezzo,
        AggiuntaVisita: data.aggiuntaVisita
      }
    });
  }

  getAll(filter: AggiuntaFilterModel) {
    return this._prisma.aggiunta.findMany({
      where: filter.getFilterDict()
    });
  }

  getPrezzoAggiunta(idAggiunta: number) {
    return this._prisma.aggiunta.findUnique({
      where: {
        IdAggiunta: idAggiunta
      },
      select: {
        Prezzo: true
      }
    })
    .then(result => result.Prezzo.toNumber() );
  }
}