import { Prisma } from "@prisma/client";
import { AbstractFilter, ConvertUtils } from "./utils";

export interface IDataViaggioModel {
  dataPartenza: Date,
  prezzoBase: number,
  posti: number,
  sconto: number,
  idGuida: number,
  idViaggio: number
}

export class DataViaggioModel implements IDataViaggioModel {
  dataPartenza: Date;
  prezzoBase: number;
  posti: number;
  sconto: number;
  idGuida: number;
  idViaggio: number;

  protected constructor(
    dataPartenza: Date,
    prezzoBase: number,
    posti: number,
    sconto: number,
    idGuida: number,
    idViaggio: number
  ) {
    this.dataPartenza = dataPartenza,
    this.prezzoBase = prezzoBase,
    this.posti = posti,
    this.sconto = sconto,
    this.idGuida = idGuida,
    this.idViaggio = idViaggio
  }

  public static fromDict(dict: Record<string, any>): DataViaggioModel {
    return new DataViaggioModel(
      new Date(dict.dataPartenza),
      Number(dict.prezzoBase),
      Number(dict.posti),
      Number(dict.sconto),
      Number(dict.idGuida),
      Number(dict.idViaggio)
    );
  }
}

export class DataViaggioCreateModel extends DataViaggioModel {

}

export class DataViaggioFilterModel extends AbstractFilter {
  getValidKeys(): string[] {
    return Object.keys(Prisma.DataViaggioScalarFieldEnum);    
  }

  protected getCastTable(): Record<string, any> {
    return {
      IdDataViaggio: ConvertUtils.toInt,
      DataPartenza: ConvertUtils.toDate,
      PrezzoBase: ConvertUtils.toInt,
      IdViaggio: ConvertUtils.toInt,
      Posti: ConvertUtils.toInt,
      IdGuida: ConvertUtils.toInt,
      IdSconto: ConvertUtils.toInt
    }
  }
}
