import { PrismaClient } from "@prisma/client";
import { ClienteFilterModel } from "../dto/cliente";
import { PrenotazioneCreateModel, PrenotazioneFilterModel } from "../dto/prenotazione";
import { AggiuntaService } from "./aggiunta";
import { BaseService } from "./base";
import { DataViaggioService } from "./dataviaggio";
import { ViaggioService } from "./viaggio";

export class PrenotazioneService extends BaseService {
  create(data: PrenotazioneCreateModel) {
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
          Viaggio: true,
          DataPartenza: true
        }
      });

      if ((new Date()).getTime() > dataViaggio.DataPartenza.getTime()) {
        throw new Error("Impossibile prenotare un viaggio gia partito");
      }

      let aggiunteViaggio = 
        await viaggioService.getAllUpgrades(dataViaggio.Viaggio.IdViaggio);
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
          IdCliente: data.idCliente
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

      //Creo la prenotazione
      let prenotazione = await prisma.prenotazione.create({
        data: {
          DataAcquisto: data.dataAcquisto,
          PrezzoTotale: prezzo,
          Cliente: {
            connect: { IdCliente: data.idCliente }
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
      where: filter.getFilterDict()
    });
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
}