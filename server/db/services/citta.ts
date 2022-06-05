import { CittaCreateModel } from "../dto/cittaDto";
import { BaseService } from "./base";

export class CittaService extends BaseService {
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