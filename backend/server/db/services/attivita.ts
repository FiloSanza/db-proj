import { AttivitaCreateModel, AttivitaDto, AttivitaFilterModel } from "../dto/attivita";
import { BaseService } from "./base";

export class AttivitaService extends BaseService {
  create(data: AttivitaCreateModel) {
    return this._prisma.$transaction(async prisma => {
      //Creo l'attivita
      let attivita = await this._prisma.attivita.create({
        data: {
          Durata: data.durata,
          Descrizione: data.descrizione,
          Citta: {
            connect: {
              IdCitta: data.idCitta
            }
          }
        }
      });
      //Creo i descrittori associtati all'attivita
      let rawData = data.idTags.map(idTag => {
        return {
          IdAttivita: attivita.IdAttivita,
          IdTag: idTag
        };
      });
      await this._prisma.descrittore.createMany({
        data: rawData
      })

      return attivita;
    });
  }
  
  getAll(filter: AttivitaFilterModel) {
    return (this._prisma.attivita.findMany({
      where: filter.getFilterDict(),
      include: {
        Citta: true,
        Descrittori: {
          include: {
            Tag: true
          }
        }
      }
    }))
    .then(results => {
      return results.map(result => ({
        idAttivita: result.IdAttivita,
        descrizione: result.Descrizione,
        durata: result.Durata,
        citta: {
          nome: result.Citta.Nome,
          id: result.Citta.IdCitta
        },
        tags: result.Descrittori.map(descrittore => ({
          idTag: descrittore.IdTag,
          descrizione: descrittore.Tag.Descrizione
        }))
      } as AttivitaDto)
    )});
  }
}