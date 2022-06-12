import { GuidaCreateModel, GuidaFilterModel } from "../dto/guida";
import { BaseService } from "./base";

export class GuidaService extends BaseService {
  register(data: GuidaCreateModel) {
    return this._prisma.guida.create({
      data: {
        Nome: data.nome,
        Cognome: data.cognome,
        Email: data.email,
        DataNascita: data.dataNascita
      }
    });
  }

  getAll(filter: GuidaFilterModel) {
    return this._prisma.guida.findMany({
      where: filter.getFilterDict()
    });
  }

  getDetails(id: number) {
    return this._prisma.guida.findUnique({
      where: {
        IdGuida: id
      },
      select: {
        IdGuida: true,
        Nome: true,
        Cognome: true,
        Email: true,
        DataNascita: true,
        Viaggi: {
          select: {
            DataPartenza: true,
            Viaggio: {
              select: {
                Descrizione: true
              }
            }
          }
        }
      }
    }).then(res => ({ 
      idGuida: res.IdGuida,
      nome: res.Nome,
      cognome: res.Cognome,
      dataNascita: res.DataNascita,
      email: res.Email,
      viaggi: res.Viaggi.map(v => ({
        dataPartenza: v.DataPartenza,
        descrizione: v.Viaggio.Descrizione
      }))
    }));
  }
}