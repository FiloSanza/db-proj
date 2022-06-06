import { GuidaCreateModel, GuidaFilterModel } from "../dto/guidaDto";
import { BaseService } from "./base";

export class GuidaService extends BaseService {
  register(data: GuidaCreateModel) {
    return this._prisma.guida.create({
      data: {
        Nome: data.nome,
        Cognome: data.cognome,
        Email: data.email,
        DataNascita: data.dataNascita
      }
    });
  }

  getAll(filter: GuidaFilterModel) {
    return this._prisma.guida.findMany({
      where: filter.getFilterDict()
    });
  }
}