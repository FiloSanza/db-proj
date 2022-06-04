import { GuidaRegistrationModel } from "../dto/guidaDto";
import { prismaClient } from "./utils";

export class GuidaService {
  private readonly _prisma = prismaClient;

  register(data: GuidaRegistrationModel) {
    return this._prisma.guida.create({
      data: {
        Nome: data.nome,
        Cognome: data.cognome,
        Email: data.email,
        DataNascita: new Date(data.dataNascita)
      }
    });
  }

  getAll(filter: Record<string, any> = {}) {
    return this._prisma.guida.findMany({
      where: filter
    });
  }
}