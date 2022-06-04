export interface ViaggioCreateModel {
  descrizione: string,
  periodo: PeriodoViaggio,
  giornate: GiornataViaggio[],
  visite: VisitaViaggio[]
}

export interface GiornataViaggio {
  numero: number,
  descrizione: string
}

export interface VisitaViaggio {
  idAttivita: number,
  ora: number,
  numeroGiornata: number
}

export interface PeriodoViaggio {
  giornoInizio: number,
  meseInizio: number,
  giornoFine: number,
  meseFine: number
}