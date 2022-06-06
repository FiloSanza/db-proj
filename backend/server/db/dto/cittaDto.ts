import { Prisma } from "@prisma/client";
import { AbstractFilter, ConvertUtils } from "./utils";

export interface ICittaModel {
  nome: string
}

export class CittaModel implements ICittaModel {
  nome: string;
  
  protected constructor(nome: string) {
    this.nome = nome;
  }

  public static fromDict(dict: Record<string, any>): CittaModel {
    return new CittaModel(dict.nome);
  }
}

export class CittaCreateModel extends CittaModel {

}

export class CittaFilterModel extends AbstractFilter {
  getValidKeys(): string[] {
    return Object.keys(Prisma.CittaScalarFieldEnum);    
  }

  protected getCastTable(): Record<string, any> {
    return {
      IdCitta: ConvertUtils.toInt,
      Nome: ConvertUtils.identity
    }
  }
}
