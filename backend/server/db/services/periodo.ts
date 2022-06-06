import { PeriodoFilterModel, PeriodoViaggio } from "../dto/viaggioDto";
import { BaseService } from "./base";

export class PeriodoViaggioService extends BaseService {  
  getAll(filter: PeriodoFilterModel) {
    return this._prisma.periodo.findMany({
      where: filter.getFilterDict()
    });
  }
}