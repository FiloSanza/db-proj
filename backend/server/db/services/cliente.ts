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
      include: {
        Prenotazioni: {
          include: {
            Recensione: true,
            DataViaggio: {
              include: {
                Guida: true,
                Viaggio: {
                  include: {
                    Giornate: {
                      include: {
                        Visite: {
                          include: {
                            Attivita: true
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
        }
      }
    }).then(res => {
      let current = res.Prenotazioni.find(p => {
        let fine = new Date(p.DataViaggio.DataPartenza.valueOf());
        fine.setDate(fine.getDate() + p.DataViaggio.Viaggio.Giornate.length - 1);

        return p.DataViaggio.DataPartenza <= new Date() && new Date <= fine;
      });

      let viaggioInCorso = null;

      if (current) {
        let inizio = current.DataViaggio.DataPartenza;
        viaggioInCorso = current.DataViaggio.Viaggio.Giornate.flatMap(g => {
          let inizioGiornata = new Date(inizio.valueOf());
          inizioGiornata.setDate(inizio.getDate() + g.Numero - 1);
          return g.Visite.map(v => {
            let inizioVisita = new Date(inizioGiornata.valueOf());
            inizioVisita.setTime(v.Ora * 1000 * 60 * 60);
            return {
              idVisita: v.IdVisita,
              descrizione: v.Attivita.Descrizione,
              inizio: inizioVisita
            };
          })
        }).filter(visita => visita.inizio > new Date());
      }
      
      return { 
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
          viaggioInCorso: viaggioInCorso,
          recensione: {
            valutazione: p.Recensione?.Valutazione,
            descrizione: p.Recensione?.Descrizione
          }
        })).sort((a, b) => b.partenza.getTime() - a.partenza.getTime())
      };
    })
  }
}