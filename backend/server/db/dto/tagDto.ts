import { Prisma } from "@prisma/client";
import { AbstractFilter, ConvertUtils } from "./utils";

export interface ITagModel {
  descrizione: string
}

export class TagModel implements ITagModel {
  descrizione: string;
  
  protected constructor(descrizione: string) {
    this.descrizione = descrizione;
  }

  public static fromDict(dict: Record<string, any>): TagModel {
    return new TagModel(dict.descrizione);
  }
}

export class TagCreateModel extends TagModel {

}

export class TagFilterModel extends AbstractFilter {
  getValidKeys(): string[] {
    return Object.keys(Prisma.TagScalarFieldEnum);    
  }

  protected getCastTable(): Record<string, any> {
    return {
      IdTag: ConvertUtils.toInt,
      Descrizione: ConvertUtils.identity
    }
  }
}
