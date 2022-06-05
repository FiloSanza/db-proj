import { Prisma } from "@prisma/client";
import { AbstractFilter, ConvertUtils } from "./utils";

export interface IGuidaModel {
  nome: string,
  cognome: string,
  dataNascita: Date,
  email: string
};

export class GuidaModel implements IGuidaModel {
  nome: string;
  cognome: string;
  dataNascita: Date;
  email: string;

  protected constructor(
      nome: string, 
      cognome: string, 
      dataNascita: Date, 
      email: string) {
    this.nome = nome;
    this.cognome = cognome;
    this.dataNascita = dataNascita;
    this.email = email;
  }    

  public static fromDict(dict: Record<string, any>): GuidaModel {
    return new GuidaModel(
      dict.nome,
      dict.cognome,
      new Date(dict.dataNascita),
      dict.email
    );
  }
}

export class GuidaCreateModel extends GuidaModel {

}

export class GuidaFilterModel extends AbstractFilter {
  getValidKeys(): string[] {
    return Object.keys(Prisma.GuidaScalarFieldEnum);
  }

  protected getCastTable(): Record<string, any> {
    return {
      IdGuida: ConvertUtils.identity,
      Nome: ConvertUtils.identity,
      Cognome: ConvertUtils.identity,
      DataNascita: ConvertUtils.toDate,
      Email: ConvertUtils.identity
    }
  }
}