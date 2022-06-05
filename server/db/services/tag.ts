import { TagCreateModel, TagFilterModel } from "../dto/tagDto";
import { BaseService } from "./base";

export class TagService extends BaseService {
  create(data: TagCreateModel) {
    return this._prisma.tag.create({
      data: {
        Descrizione: data.descrizione
      }
    });
  }

  getAll(filter: TagFilterModel) {
    return this._prisma.tag.findMany({
      where: filter.getFilterDict()
    });
  }
}