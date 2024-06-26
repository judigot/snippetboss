import { PrismaClient } from '@prisma/client';
class Prisma {
  private static instance: PrismaClient;

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!Prisma.instance) {
      Prisma.instance = new PrismaClient();
    }
    return Prisma.instance;
  }
}

// Singleton instance
export const prisma = Prisma.getInstance();
