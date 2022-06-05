import { TagCreateModel } from "../dto/tagDto";
import { BaseService } from "./base";

export class TagService extends BaseService {
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