import { TagCreateModel } from "../dto/tagDto";
import { prismaClient } from "./utils";

export class TagService {
  private readonly _prisma = prismaClient;

  create(data: TagCreateModel) {
    return this._prisma.tag.create({
      data: {
        Descrizione: data.descrizione
      }
    });
  }

  getAll(filter: Record<string, any> = {}) {
    return this._prisma.tag.findMany({
      where: filter
    });
  }
}