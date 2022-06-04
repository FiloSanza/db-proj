import { ClienteRegistrationModel } from "../dto/clienteDto";
import { prismaClient } from "./utils";

export class ClienteService {
  private readonly _prisma = prismaClient;

  register(data: ClienteRegistrationModel) {
    return this._prisma.cliente.create({
      data: {
        Nome: data.nome,
        Cognome: data.cognome,
        Email: data.email,
        DataNascita: new Date(data.dataNascita)
      }
    });
  }

  getAll(filter: Record<string, any> = {}) {
    return this._prisma.cliente.findMany({
      where: filter
    });
  }
}