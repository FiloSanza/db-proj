import { Prisma } from "@prisma/client";
import { AbstractFilter, ConvertUtils } from "./utils";

export interface IViaggioModel {
  descrizione: string,
  periodo: IPeriodoViaggio,
  giornate: IGiornataViaggio[],
  visite: IVisitaViaggio[],
  upgradeViaggioIds: number[],
}

export interface IGiornataViaggio {
  numero: number,
  descrizione: string
}

export interface IVisitaViaggio {
  idAttivita: number,
  ora: number,
  numeroGiornata: number,
  updates: number[]
}

export interface IPeriodoViaggio {
  giornoInizio: number,
  meseInizio: number,
  giornoFine: number,
  meseFine: number
}

export class VisitaViaggio implements IVisitaViaggio {
  idAttivita: number;
  ora: number;
  numeroGiornata: number;
  updates: number[];
  
  protected constructor(
    idAttivita: number,
    ora: number,
    numeroGiornata: number,
    updates: number[] 
  ) {
    this.idAttivita = idAttivita;
    this.ora = ora;
    this.numeroGiornata = numeroGiornata;
    this.updates = updates;
  }

  public static fromDict(dict: Record<string, any>): VisitaViaggio {
    return new VisitaViaggio(
      Number(dict.idAttivita),
      Number(dict.ora),
      Number(dict.numeroGiornata),
      ConvertUtils.toNumberArray(dict.updates)
    );
  }
}

export class PeriodoViaggio implements IPeriodoViaggio {
  giornoInizio: number;
  meseInizio: number;
  giornoFine: number;
  meseFine: number;
  
  protected constructor(
    giornoInizio: number,
    meseInizio: number,
    giornoFine: number,
    meseFine: number
  ) {
    this.giornoInizio = giornoInizio;
    this.meseInizio = meseInizio;
    this.giornoFine = giornoFine;
    this.meseFine = meseFine;
  }

  public static fromDict(dict: Record<string, any>): PeriodoViaggio {
    return new PeriodoViaggio(
      Number(dict.giornoInizio),
      Number(dict.meseInizio),
      Number(dict.giornoFine),
      Number(dict.meseFine)
    );
  }
}

export class GiornataViaggio implements IGiornataViaggio {
  numero: number;
  descrizione: string;
  
  protected constructor(
    numero: number,
    descrizione: string
  ) {
    this.numero = numero;
    this.descrizione = descrizione;
  }

  public static fromDict(dict: Record<string, any>): GiornataViaggio {
    return new GiornataViaggio(
      Number(dict.numero),
      dict.descrizione
    );
  }
}

export class ViaggioModel implements IViaggioModel {
  descrizione: string;
  periodo: IPeriodoViaggio;
  giornate: IGiornataViaggio[];
  visite: IVisitaViaggio[];
  upgradeViaggioIds: number[];
  
  
  protected constructor(
    descrizione: string,
    periodo: IPeriodoViaggio,
    giornate: IGiornataViaggio[],
    visite: IVisitaViaggio[],
    upgradeViaggioIds: number[]  
  ) {
    this.descrizione = descrizione;
    this.periodo = periodo;
    this.giornate = giornate;
    this.visite = visite;
    this.upgradeViaggioIds = upgradeViaggioIds;
  
  }

  public static fromDict(dict: Record<string, any>): ViaggioModel {
    return new ViaggioModel(
      dict.descrizione,
      PeriodoViaggio.fromDict(dict.periodo),
      dict.giornate.map(g => GiornataViaggio.fromDict(g)),
      dict.visite.map(v => VisitaViaggio.fromDict(v)),
      ConvertUtils.toNumberArray(dict.upgradeViaggioIds) 
    );
  }
}

export class ViaggioCreateModel extends ViaggioModel {

}

export class ViaggioFilterModel extends AbstractFilter {
  getValidKeys(): string[] {
    return Object.keys(Prisma.ViaggioScalarFieldEnum);
  }
  protected getCastTable(): Record<string, any> {
    return {
      IdViaggio: ConvertUtils.toInt,
      Descrizione: ConvertUtils.identity,
      IdPeriodo: ConvertUtils.toInt
    }
  }
}

export class VisitaFilterModel extends AbstractFilter {
  getValidKeys(): string[] {
    return Object.keys(Prisma.VisitaScalarFieldEnum)
  }
  protected getCastTable(): Record<string, any> {
    return {
      IdVisita: ConvertUtils.toInt,
      IdAttivita: ConvertUtils.toInt,
      Ora: ConvertUtils.toInt,
      IdGiornata: ConvertUtils.toInt
    };
  }
}

export class GiornataFilterModel extends AbstractFilter {
  getValidKeys(): string[] {
    return Object.keys(Prisma.GiornataScalarFieldEnum);
  }
  protected getCastTable(): Record<string, any> {
    return {
      IdGiornata: ConvertUtils.toInt,
      Numero: ConvertUtils.toInt,
      IdViaggio: ConvertUtils.toInt,
      Descrizione: ConvertUtils.identity
    }
  }
}

export class PeriodoFilterModel extends AbstractFilter {
  getValidKeys(): string[] {
    return Object.keys(Prisma.PeriodoScalarFieldEnum);
  }
  protected getCastTable(): Record<string, any> {
    return {
      IdPeriodo: ConvertUtils.toInt,
      GiornoInizio: ConvertUtils.toInt,
      MeseInizio: ConvertUtils.toInt,
      GiornoFine: ConvertUtils.toInt,
      MeseFine: ConvertUtils.toInt
    }
  }
}