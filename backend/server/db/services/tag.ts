import { isExpressionWithTypeArguments } from "typescript";
import { TagCreateModel, TagFilterModel } from "../dto/tag";
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

  getViaggi(id: number) {
    return this._prisma.tag.findUnique({
      where: {
        IdTag: id
      },
      select: {
        IdTag: true,
        Descrizione: true,
        Descrittori: {
          select: {
            Attivita: {
              select: {
                Visite: {
                  select: {
                    Giornata: {
                      select: {
                        Viaggio: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }).then(res => ({
      idTag: res.IdTag,
      descrizione: res.Descrizione,
      viaggi: res.Descrittori.flatMap(d => d.Attivita.Visite.flatMap(v => ({
        idViaggio: v.Giornata.Viaggio.IdViaggio,
        descrizione: v.Giornata.Viaggio.Descrizione
      })))
    })).then(res => {
      let aggiunti = new Set();
      let viaggi = [];
      for(let i=0; i<res.viaggi.length; i++) {
        if (!aggiunti.has(res.viaggi[i].idViaggio)) {
          aggiunti.add(res.viaggi[i].idViaggio);
          viaggi.push(res.viaggi[i]);
        }
      }
      return {
        ...res,
        viaggi: viaggi
      };
    });
  }
}