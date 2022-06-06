import { Prisma } from "@prisma/client";
import { AbstractFilter, ConvertUtils } from "./utils";

export interface IRecensioneModel {
  emailCliente: string,
  valutazione: number,
  descrizione: string,
  dataPubblicazione: Date
}

export class RecensioneModel implements IRecensioneModel {
  emailCliente: string;
  valutazione: number;
  descrizione: string;
  dataPubblicazione: Date;

  protected constructor(
    emailCliente: string,
    valutazione: number,
    descrizione: string,
    dataPubblicazione: Date
    ) {
    this.emailCliente = emailCliente;
    this.valutazione = valutazione;
    this.descrizione = descrizione;
    this.dataPubblicazione = dataPubblicazione;
  }

  public static fromDict(dict: Record<string, any>): RecensioneModel {
    return new RecensioneModel(
      dict.emailCliente,
      Number(dict.valutazione),
      dict.descrizione,
      new Date(dict.dataPubblicazione)
    );
  }
}

export class RecensioneFilterModel extends AbstractFilter {
  getValidKeys(): string[] {
    return Object.keys(Prisma.RecensioneScalarFieldEnum);
  }
  protected getCastTable(): Record<string, any> {
    return {
      IdRecensione: ConvertUtils.toInt,
      IdPrenotazione: ConvertUtils.toInt,
      Valutazione: ConvertUtils.toInt,
      Descrizione: ConvertUtils.identity,
      DataPubblicazione: ConvertUtils.toDate
    }
  }

}