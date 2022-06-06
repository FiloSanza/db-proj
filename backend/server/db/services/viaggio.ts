import { PrismaClient } from "@prisma/client";
import { AggiuntaCreateModel, AggiuntaFilterModel } from "../dto/aggiuntaDto";
import { ViaggioCreateModel, ViaggioFilterModel } from "../dto/viaggioDto";
import { AggiuntaService } from "./aggiunta";
import { BaseService } from "./base";

export class ViaggioService extends BaseService {
  create(data: ViaggioCreateModel) {
    return this._prisma.$transaction(async (prisma) => {
      let aggiunte = new AggiuntaService(prisma as PrismaClient);

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
          }
        }
      });

      //Aggiungo le aggiunte viaggio
      let valid = await data.upgradeViaggioIds.every(async upd => {
        let aggiunta = await aggiunte.getAll(new AggiuntaFilterModel({IdAggiunta: upd}));
        return aggiunta.length != 0 ? !aggiunta[0].AggiuntaVisita : false;
      })

      if (!valid) {
        throw new Error("Invalid update_viaggio ids");
      }

      for (let i=0; i<data.upgradeViaggioIds.length; i++) {
        let id = data.upgradeViaggioIds[i];
        await prisma.upgradeViaggio.create({
          data: {
            IdAggiunta: id,
            IdViaggio: viaggio.IdViaggio
          }
        })
      }

      //Creo le giornate
      let dataGiornate = data.giornate.map(giornata => ({
        Descrizione: giornata.descrizione,
        IdViaggio: viaggio.IdViaggio,
        Numero: giornata.numero,
      }));

      await prisma.giornata.createMany({
        data: dataGiornate
      });

      //Creo le visite
      for (let i=0; i<data.visite.length; i++) {
        let visita = data.visite[i];
        let insertedVisita = await prisma.visita.create({
          data: {
            Ora: visita.ora,
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
        });

        //Aggiunte visite
        let valid = await visita.updates.every(async upd => {
          let aggiunta = await aggiunte.getAll(new AggiuntaFilterModel({IdAggiunta: upd}));
          return aggiunta.length != 0 ? aggiunta[0].AggiuntaVisita : false;
        })
  
        if (!valid) {
          throw new Error("Invalid update_viaggio ids");
        }

        for (let j=0; j<visita.updates.length; j++) {
          let id = visita.updates[j];
          await prisma.upgradeVisita.create({
            data: {
              Aggiunta: {
                connect: {
                  IdAggiunta: id
                }
              },
              Visita: {
                connect: {
                  IdVisita: insertedVisita.IdVisita
                }
              }
            }
          });
        }
      }

      return viaggio;
    });
  }
  
  getAll(filter: ViaggioFilterModel) {
    return this._prisma.viaggio.findMany({
      where: filter.getFilterDict(),
      include: {
        Giornate: {
          include: {
            Visite: {
              include: {
                Attivita: true,
                Upgrade: {
                  include: {
                    Aggiunta: true
                  }
                }
              }
            }
          }
        },
        Upgrade: {
          include: {
            Aggiunta: true
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
        aggiunte: result.Upgrade.map(upg => ({ 
          descrizione: upg.Aggiunta.Descrizione, 
          prezzo: upg.Aggiunta.Prezzo 
        })),
        giornate: result.Giornate.map(giornata => ({
          numero: giornata.Numero,
          descrizione: giornata.Descrizione,
          visite: giornata.Visite.map(visita => ({
            idVisita: visita.IdVisita,
            ora: visita.Ora,
            descrizioneAttivita: visita.Attivita.Descrizione,
            durata: visita.Attivita.Durata,
            aggiunte: visita.Upgrade.map(upg => ({ 
              descrizione: upg.Aggiunta.Descrizione,
              prezzo: upg.Aggiunta.Prezzo
            }))
          }))
        }))
      }));
    })
  }

  getAllUpgrades(id: number): Promise<Record<string, number>> {
    return this._prisma.viaggio.findUnique({
      where: {
        IdViaggio: id
      },
      include: {
        Giornate: {
          include: {
            Visite: {
              include: {
                Upgrade: {
                  select: {
                    Aggiunta: true
                  }
                }
              }
            }
          }
        },
        Upgrade: {
          select: {
            Aggiunta: true
          }
        },
      }
    })
    //Take only IdAggiunta
    .then(result => {
      return result.Upgrade.map(u => u.Aggiunta.IdAggiunta)
          .concat(
            result.Giornate.flatMap(
              g => g.Visite.flatMap(
                v => v.Upgrade.flatMap(
                  u => u.Aggiunta.IdAggiunta))));
    })
    //Count occurrences
    .then(result => result.reduce(function (acc, curr) {
        return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc;
      }, {})
    );
  }
}