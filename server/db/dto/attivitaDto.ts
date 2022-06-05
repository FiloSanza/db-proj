import { Prisma } from "@prisma/client";
import { AbstractFilter, ConvertUtils } from "./utils";

export interface IAttivitaModel {
  descrizione: string,
  durata: number,
  idCitta: number,
  idTags: number[]
}

export class AttivitaModel implements AttivitaModel{
  descrizione: string;
  durata: number;
  idCitta: number;
  idTags: number[];
  
  protected constructor(
    descrizione: string, 
    durata: number, 
    idCitta: number, 
    idTags: number[]) {
      this.descrizione = descrizione;
      this.durata = durata;
      this.idCitta = idCitta;
      this.idTags = idTags;
  }

  public static fromDict(dict: Record<string, any>): AttivitaModel {
    return new AttivitaModel(
      dict.descrizione,
      Number(dict.durata),
      Number(dict.idCitta),
      ConvertUtils.toNumberArray(dict.idTags));
  }
}

export class AttivitaCreateModel extends AttivitaModel {

}

export class AttivitaFilterModel extends AbstractFilter {
  protected getCastTable(): Record<string, any> {
    return {
      IdAttivita: ConvertUtils.toInt,
      Descrizione: ConvertUtils.identity,
      Durata: ConvertUtils.toInt,
      IdCitta: ConvertUtils.toInt
    }
  }

  getValidKeys(): string[] {
    return Object.keys(Prisma.AttivitaScalarFieldEnum);
  }
}

export interface AttivitaDto {
  descrizione: string,
  durata: number,
  citta: Record<string, any>,
  tags: Record<string, any>
}