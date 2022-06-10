import { CittaCreateModel, CittaFilterModel } from "../dto/citta";
import { BaseService } from "./base";

export class CittaService extends BaseService {
  create(data: CittaCreateModel) {
    return this._prisma.citta.create({
      data: {
        Nome: data.nome
      }
    });
  }

  getAll(filter: CittaFilterModel) {
    return this._prisma.citta.findMany({
      where: filter.getFilterDict()
    });
  }
}