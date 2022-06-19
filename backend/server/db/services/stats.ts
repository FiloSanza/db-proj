import { ViaggioFilterModel } from "../dto/viaggio";
import { AggiuntaService } from "./aggiunta";
import { BaseService } from "./base";
import { PrenotazioneService } from "./prenotazione";
import { ViaggioService } from "./viaggio";

export class StatsService extends BaseService {
  async get() {
    let viaggioService = new ViaggioService();
    let guide = await this._prisma.guida.findMany({
      select: {
        Email: true,
        Viaggi: {
          select: {
            Prenotazioni: {
              select: {
                Recensione: true
              }
            }
          }
        }
      }
    }).then(results => results.map(r => ({
      guida: r.Email,
      valutazioneMedia: this._getMedia(r.Viaggi.flatMap(v => v.Prenotazioni.filter(p => p.Recensione).map(p => p.Recensione.Valutazione)))
    })));

    let sortGuide = [...guide.entries()].map(e => e[1]).sort(function(a, b){return b.valutazioneMedia-a.valutazioneMedia});
    let bestGuida = sortGuide[0];
    
    let viaggi = await viaggioService.getAll(new ViaggioFilterModel());
    let viaggio = viaggi.map(v => ({
      idViaggio: v.idViaggio, 
      descrizione: v.descrizione, 
      valutazione: v.valutazione})
    );
    
    let sortViaggi = [...viaggi.entries()].map(e => e[1]).sort(function(a, b){return b.valutazione-a.valutazione});    
    let bestViaggio = sortViaggi[0];

    let avgAggiunteViaggio = await Promise.all(viaggi.map(v => this._getPrezzoAggiunteViaggio(v)));

    console.log(avgAggiunteViaggio);

    let maxAvgAggiunteViaggio = avgAggiunteViaggio.sort((a, b) => {
      if (a.avgAggiunte < b.avgAggiunte) return 1;
      else if (a.avgAggiunte > b.avgAggiunte) return -1;
      else return 0;
    })[0];

    let prenotazioneService = new PrenotazioneService();
    let spesaClienti = (await prenotazioneService.getSpesaMediaPerCliente())
    let spesaTotaleClienti = spesaClienti.map(x => x._sum.PrezzoTotale.toNumber())
      .reduce((a, b) => a + b, 0);
    
    return {
      valutazioneViaggio: bestViaggio,
      valutazioneGuida: bestGuida,
      maxAvgAggiunteViaggio: maxAvgAggiunteViaggio,
      spesaMediaClienti: (spesaTotaleClienti / spesaClienti.length) || 0,
    }
  }

  _getMedia(recensioni: number[]) {
    let sum = recensioni.reduce((a, b) => a + b, 0);
    console.log(recensioni);
    return (sum / recensioni.length) || 0;
  }

  async _getPrezzoAggiunteViaggio(viaggio) {
    let prenotazioneService = new PrenotazioneService();
    let aggiuntaService = new AggiuntaService();
    let viaggioService = new ViaggioService();
    
    console.log("viaggio: ", viaggio.idViaggio);

    let prenotazioni = await prenotazioneService.getForViaggio(viaggio.idViaggio);
      
    let prezzoAggiunte = (await Promise.all(prenotazioni
      .flatMap(p => prenotazioneService.getPrezzoAggiunte(p.IdPrenotazione))
    ));
    
    return {
      idViaggio: viaggio.idViaggio,
      avgAggiunte: (prezzoAggiunte.reduce((a, b) => a + b, 0) / prenotazioni.length) || 0,
      descrizione: viaggio.descrizione
    };
  }
}