import { AggiuntaCreateModel } from "../dto/aggiunta";
import { prismaClient } from "./utils";

export class AggiuntaService {
  private readonly _prisma = prismaClient;
  
  create(data: AggiuntaCreateModel) {
    return this._prisma.aggiunta.create({
      data: {
        Descrizione: data.descrizione,
        Prezzo: data.prezzo,
        AggiuntaVisita: data.aggiuntaVisita
      }
    });
  }
  
  getAll(filter: Record<string, any> = {}) {
    return this._prisma.aggiunta.findMany({
      where: filter
    });
  }
}