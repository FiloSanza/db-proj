import { Prisma, PrismaClient } from "@prisma/client";
import { PrenotazioneCreateModel, PrenotazioneFilterModel } from "../dto/prenotazione";
import { AggiuntaService } from "./aggiunta";
import { BaseService } from "./base";
import { ClienteService } from "./cliente";
import { DataViaggioService } from "./dataviaggio";
import { ViaggioService } from "./viaggio";

export class PrenotazioneService extends BaseService {
  
  create(data: PrenotazioneCreateModel) {
    console.log(data);
    return this._prisma.$transaction(async prisma => {
      //Controllo che ci siano posti
      let dataViaggioService = new DataViaggioService(prisma as PrismaClient);
      let postiRimasti = await dataViaggioService.countPostiRimasti(data.idDataViaggio);

      if (postiRimasti <= 0) {
        throw new Error("Nessun posto rimasto per questa data.");
      }

      //Controllo che tutte le aggiunte siano corrette
      let viaggioService = new ViaggioService(prisma as PrismaClient);
      let dataViaggio = await prisma.dataViaggio.findUnique({
        where: {
          IdDataViaggio: data.idDataViaggio
        },
        select: {
          Viaggio: {
            select: {
              Giornate: true,
              Descrizione: true,
              IdViaggio: true,
              IdPeriodo: true
            }
          },
          DataPartenza: true
        }
      });

      //controllo che non ci siano sovrapposizioni nelle prenotazioni
      let prenotazioni = await prisma.prenotazione.findMany({
        where: { Cliente: { Email: data.email }},
        include: {
          DataViaggio: {
            include: {
              Viaggio: {
                include: {
                  Giornate: true
                }
              }
            }
          }
        }
      }).then(results => results.map(res => {
        let fine = new Date(res.DataViaggio.DataPartenza.valueOf());       
        fine.setDate(fine.getDate() + res.DataViaggio.Viaggio.Giornate.length);
        return {
          dataInizio: res.DataViaggio.DataPartenza,
          dataFine: fine
        };
      }));

      let inizio = dataViaggio.DataPartenza;
      let fine = new Date(dataViaggio.DataPartenza.valueOf());
      fine.setDate(fine.getDate() + dataViaggio.Viaggio.Giornate.length);
      let doNotOverlap = prenotazioni.every(p => !((p.dataInizio <= inizio && inizio <= p.dataFine) || (inizio <= p.dataInizio && p.dataInizio <= fine)));
      if (!doNotOverlap) {
        throw new Error("Prenotazioni sovrapposte");
      }

      if ((new Date()).getTime() > dataViaggio.DataPartenza.getTime()) {
        throw new Error("Impossibile prenotare un viaggio gia partito");
      }

      let aggiunteViaggio = 
        await viaggioService.countAllUpgrades(dataViaggio.Viaggio.IdViaggio);
      let valid = data.aggiunteIds.every(id => id in aggiunteViaggio);
      if (!valid) {
        throw new Error("Id Aggiunte non valido");
      }
      
      let aggiuntaService = new AggiuntaService(prisma as PrismaClient);
      let prezzoBase = await dataViaggioService.getPrezzo(data.idDataViaggio);
      let prezzoAggiunte = await Promise.all(data.aggiunteIds.map(
        async id => (await aggiuntaService.getPrezzoAggiunta(id)) * aggiunteViaggio[id]));
      let prezzo = prezzoBase + prezzoAggiunte.reduce((acc, value) => acc + value, 0);

      //Controllo che Cliente non sia in viaggio in quel periodo
      let prenotazioniCliente = await prisma.prenotazione.findMany({
        where: {
          Cliente: {
            Email: data.email
          }
        },
        select: {
          IdDataViaggio: true
        }
      }).then(results => results.map(r => r.IdDataViaggio));

      let periodoViaggio = await dataViaggioService.getDataInizioEDataFine(data.idDataViaggio);
      valid = prenotazioniCliente.every(async p => {
        let date = await dataViaggioService.getDataInizioEDataFine(p);
        return periodoViaggio.fine.getTime() < date.inizio.getTime() || date.fine.getTime() < periodoViaggio.inizio.getTime();
      });

      if (!valid) {
        throw new Error("Ci sono delle prenotazioni sovrapposte.");
      }

      console.log(data);

      //Creo la prenotazione
      let prenotazione = await prisma.prenotazione.create({
        data: {
          DataAcquisto: data.dataAcquisto,
          PrezzoTotale: prezzo,
          Cliente: {
            connect: {
              Email: data.email
            }
          },
          DataViaggio: {
            connect: { IdDataViaggio: data.idDataViaggio}
          }
        }
      });
        
      let rawAggiunte = data.aggiunteIds.map(id => ({
        IdAggiunta: id, 
        IdPrenotazione: prenotazione.IdPrenotazione
      }));

      await prisma.aggiuntaPrenotazione.createMany({
        data: rawAggiunte
      });

      return prenotazione;
    });
  }

  getAll(filter: PrenotazioneFilterModel) {
    return this._prisma.prenotazione.findMany({
      where: filter.getFilterDict(),
      include: {
        Cliente: true
      }
    });
  }

  getPrezzoAggiunte(id: number) {
    return this._prisma.prenotazione.findUnique({
      where: { IdPrenotazione: id },
      include: {
        DataViaggio: {
          include: {
            Sconto: true
          }
        },
        Aggiunte: true
      } 
    }).then(res => {
      let prezzoTotale = res.PrezzoTotale.toNumber();
      let sconto = (res.DataViaggio?.Sconto.Percentuale) ?? 0;
      let prezzoBase = res.DataViaggio.PrezzoBase.toNumber();
      console.log(`Prezzo ${id} ${prezzoTotale - (1 - sconto/100) * prezzoBase}`);
      
      return prezzoTotale - (1 - sconto/100) * prezzoBase;
    })
  }
  
  getForCliente(email: string) {
    return this._prisma.prenotazione.findMany({
      where: {
        Cliente: {
          Email: email
        }
      }
    });
  }

  getSpesaMediaPerCliente() {
    return this._prisma.prenotazione.groupBy({
      by: ["IdCliente"],
      _sum: {
        PrezzoTotale: true,
      }
    })
  }

  getForViaggio(idViaggio: number) {
    return this._prisma.prenotazione.findMany({
      where: {
        DataViaggio: {
          IdViaggio: idViaggio
        }
      },
      include: {
        Aggiunte: true
      }
    })
  }
}