export interface PrenotazioneCreateModel {
  idCliente: number,
  idDataViaggio: number,
  dataAcquisto: Date,
  prezzoTotale: number,
  aggiunteIds: number[]
}