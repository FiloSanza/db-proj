export interface AttivitaCreateModel {
  descrizione: string,
  durata: number,
  idCitta: number,
  idTags: number[]
}

export interface AttivitaDto {
  descrizione: string,
  durata: number,
  citta: Record<string, any>,
  tags: Record<string, any>
}