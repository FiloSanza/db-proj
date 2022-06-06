import { Prisma } from "@prisma/client";
import { AbstractFilter, ConvertUtils } from "./utils";

export interface IPrenotazioneModel {
  idCliente: number,
  idDataViaggio: number,
  dataAcquisto: Date,
  prezzoTotale: number,
  aggiunteIds: number[]
}

export class PrenotazioneModel implements IPrenotazioneModel {
  idCliente: number;
  idDataViaggio: number;
  dataAcquisto: Date;
  prezzoTotale: number;
  aggiunteIds: number[];
  
  protected constructor(
    idCliente: number,
    idDataViaggio: number,
    dataAcquisto: Date,
    prezzoTotale: number,
    aggiunteIds: number[]
  ) {
    this.idCliente = idCliente;
    this.idDataViaggio = idDataViaggio;
    this.dataAcquisto = dataAcquisto;
    this.prezzoTotale = prezzoTotale;
    this.aggiunteIds = aggiunteIds;
  }

  public static fromDict(dict: Record<string, any>): PrenotazioneModel {
    return new PrenotazioneModel(
      Number(dict.idCliente),
      Number(dict.idDataViaggio),
      new Date(dict.dataAcquisto),
      Number(dict.prezzoTotale),
      ConvertUtils.toNumberArray(dict.aggiunteIds)
    );
  }
}

export class PrenotazioneCreateModel extends PrenotazioneModel {

}

export class PrenotazioneFilterModel extends AbstractFilter {
  getValidKeys(): string[] {
    return Object.keys(Prisma.PrenotazioneScalarFieldEnum);    
  }

  protected getCastTable(): Record<string, any> {
    return {
      IdPrenotazione: ConvertUtils.toInt,
      IdCliente: ConvertUtils.toInt,
      IdDataViaggio: ConvertUtils.toInt,
      DataAcquisto: ConvertUtils.toDate,
      PrezzoTotale: ConvertUtils.toInt
    }
  }
}
