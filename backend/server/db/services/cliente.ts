import { ClienteFilterModel, ClienteCreateModel } from "../dto/cliente";
import { RecensioneCreateModel } from "../dto/recensione";
import { BaseService } from "./base";

export class ClienteService extends BaseService {
  register(data: ClienteCreateModel) {
    return this._prisma.cliente.create({
      data: {
        Nome: data.nome,
        Cognome: data.cognome,
        Email: data.email,
        DataNascita: data.dataNascita.toISOString()
      }
    });
  }

  getAll(filter: ClienteFilterModel) {
    return this._prisma.cliente.findMany({
      where: filter.getFilterDict()
    });
  }

  getDetails(id: number) {    
    return this._prisma.cliente.findUnique({
      where: {
        IdCliente: id
      },
      select: {
        IdCliente: true,
        Nome: true,
        Cognome: true,
        Email: true,
        DataNascita: true,
        Prenotazioni: {
          select: {
            IdPrenotazione: true,
            Recensione: true,
            DataAcquisto: true,
            DataViaggio: {
              select: {
                DataPartenza: true,
                Guida: {
                  select: {
                    Email: true
                  }
                },
                Viaggio: {
                  select: {
                    Descrizione: true
                  }
                }
              }
            }
          },
        }
      }
    }).then(res => ({ 
      idCliente: res.IdCliente,
      nome: res.Nome,
      cognome: res.Cognome,
      dataNascita: res.DataNascita,
      email: res.Email,
      prenotazioni: res.Prenotazioni.map(p => ({
        idPrenotazione: p.IdPrenotazione,
        dataAcquisto: p.DataAcquisto,
        viaggio: p.DataViaggio.Viaggio.Descrizione,
        guida: p.DataViaggio.Guida.Email,
        partenza: p.DataViaggio.DataPartenza,
        recensione: {
          valutazione: p.Recensione?.Valutazione,
          descrizione: p.Recensione?.Descrizione
        }
      })).sort((a, b) => b.partenza.getTime() - a.partenza.getTime())
    }))
  }
}