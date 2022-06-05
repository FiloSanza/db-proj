import { Prisma } from "@prisma/client";
import { AbstractFilter, ConvertUtils } from "./utils";

export interface IClienteModel {
  nome: string,
  cognome: string,
  dataNascita: Date,
  email: string
};

export class ClienteModel implements IClienteModel {
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

  public static fromDict(dict: Record<string, any>): ClienteModel {
    return new ClienteModel(
      dict.nome,
      dict.cognome,
      new Date(dict.dataNascita),
      dict.email
    );
  }
}

export class ClienteCreateModel extends ClienteModel {

}

export class ClienteFilterModel extends AbstractFilter {
  getValidKeys(): string[] {
    return Object.keys(Prisma.ClienteScalarFieldEnum);
  }

  protected getCastTable(): Record<string, any> {
    return {
      IdCliente: ConvertUtils.identity,
      Nome: ConvertUtils.identity,
      Cognome: ConvertUtils.identity,
      DataNascita: ConvertUtils.toDate,
      Email: ConvertUtils.identity
    }
  }
}