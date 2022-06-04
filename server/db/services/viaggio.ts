import { ViaggioCreateModel } from "../dto/viaggioDto";
import { PeriodoViaggioService } from "./periodo";
import { prismaClient } from "./utils";

export class ViaggioService {
  private readonly _prisma = prismaClient;
  private readonly _periodoService = new PeriodoViaggioService();
  
  create(data: ViaggioCreateModel) {
    return this._prisma.$transaction(async (prisma) => {
      //Creo il viaggio
      let viaggio = await prisma.viaggio.create({
        data: {
          Descrizione: data.descrizione,
          Periodo: {
            connectOrCreate: {
              where: {
                GiornoInizio_MeseInizio_GiornoFine_MeseFine: {
                  GiornoInizio: data.periodo.giornoInizio,
                  GiornoFine: data.periodo.giornoFine,
                  MeseInizio: data.periodo.meseInizio,
                  MeseFine: data.periodo.meseFine
                }
              },
              create: {
                GiornoInizio: data.periodo.giornoInizio,
                GiornoFine: data.periodo.giornoFine,
                MeseInizio: data.periodo.meseInizio,
                MeseFine: data.periodo.meseFine
              }
            }
          },
        }
      });

      //Creo le giornate
      let dataGiornate = data.giornate.map(giornata => ({
        Descrizione: giornata.descrizione,
        IdViaggio: viaggio.IdViaggio,
        Numero: giornata.numero,
      }));

      await prisma.giornata.createMany({
        data: dataGiornate
      });

      for (let i=0; i<data.visite.length; i++) {
        let visita = data.visite[i];
        await prisma.visita.create({
          data: {
            Ora: Number(visita.ora),
            Attivita: {
              connect: { IdAttivita: visita.idAttivita }
            },
            Giornata: {
              connect: {
                IdViaggio_Numero: {
                  IdViaggio: viaggio.IdViaggio,
                  Numero: visita.numeroGiornata
                }
              }
            }
          }
        })
      }

      return viaggio;
    });
  }
  
  getAll(filter: Record<string, any> = {}) {
    return this._prisma.viaggio.findMany({
      where: filter,
      include: {
        Giornate: {
          include: {
            Visite: {
              include: {
                Attivita: true
              }
            }
          }
        },
        Periodo: true
      }
    })
    .then(results => {
      return results.map(result => ({
        idViaggio: result.IdViaggio,
        descrizione: result.Descrizione,
        periodo: {
          giornoInizio: result.Periodo.GiornoInizio,
          giornoFine: result.Periodo.GiornoFine,
          meseInizio: result.Periodo.MeseInizio,
          meseFine: result.Periodo.MeseFine
        },
        giornate: result.Giornate.map(giornata => ({
          numero: giornata.Numero,
          descrizione: giornata.Descrizione,
          visite: giornata.Visite.map(visita => ({
            idVisita: visita.IdVisita,
            ora: visita.Ora,
            descrizioneAttivita: visita.Attivita.Descrizione,
            durata: visita.Attivita.Durata
          }))
        }))
      }));
    })
  }
}