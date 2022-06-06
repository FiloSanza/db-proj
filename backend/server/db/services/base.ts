import { Prisma, PrismaClient } from "@prisma/client";
import { prismaClient } from "./utils";

export abstract class BaseService {
  protected readonly _prisma: PrismaClient;

  constructor(prisma = prismaClient) {
    this._prisma = prisma;
  }
}