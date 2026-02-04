import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly client: PrismaClient;

  constructor() {
    const adapter = new PrismaPg(process.env.DATABASE_URL as string);
    this.client = new PrismaClient({ adapter });
  }

  async onModuleInit() {
    await this.client.$connect();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }

  get character() {
    return this.client.character;
  }

  get gender() {
    return this.client.gender;
  }

  get origin() {
    return this.client.origin;
  }

  get $transaction() {
    return this.client.$transaction.bind(this.client);
  }
}
