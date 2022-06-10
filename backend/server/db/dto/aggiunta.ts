import { Prisma } from "@prisma/client";
import { AbstractFilter, ConvertUtils } from "./utils";

export interface IAggiuntaModel {
  descrizione: string,
  prezzo: number,
  aggiuntaVisita: boolean
}

export class AggiuntaModel implements IAggiuntaModel {
  descrizione: string;
  prezzo: number;
  aggiuntaVisita: boolean;

  protected constructor(descrizione, prezzo, aggiuntaVisita) {
    this.descrizione = descrizione;
    this.prezzo = prezzo;
    this.aggiuntaVisita = aggiuntaVisita;
  }

  public static fromDict(dict: Record<string, any>): AggiuntaModel {
    return new AggiuntaModel(
      dict.descrizione, 
      Number(dict.prezzo), 
      ConvertUtils.toBoolean(dict.aggiuntaVisita));
  }
}

export class AggiuntaCreateModel extends AggiuntaModel {

}

export class AggiuntaFilterModel extends AbstractFilter {
  protected getCastTable(): Record<string, any> {
    return {
      IdAggiunta: ConvertUtils.toInt,
      IdPrenotazione: ConvertUtils.toInt
    };
  }
  getValidKeys(): string[] {
    return Object.keys(Prisma.AggiuntaPrenotazioneScalarFieldEnum);
  }
}