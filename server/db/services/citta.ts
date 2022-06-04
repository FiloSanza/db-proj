import { CittaCreateModel } from "../dto/cittaDto";
import { prismaClient } from "./utils";

export class CittaService {
  private readonly _prisma = prismaClient;

  create(data: CittaCreateModel) {
    return this._prisma.citta.create({
      data: {
        Nome: data.nome
      }
    });
  }

  getAll(filter: Record<string, any> = {}) {
    return this._prisma.citta.findMany({
      where: filter
    });
  }
}