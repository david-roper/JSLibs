import { type DynamicModule, Module } from '@nestjs/common';
import Prisma from 'prisma';

import { PRISMA_CLIENT_TOKEN } from './prisma.constants';
import { PrismaService } from './prisma.service';

@Module({})
export class PrismaModule {
  static forRoot<TClient>(client: TClient): DynamicModule {
    return {
      exports: [PRISMA_CLIENT_TOKEN, PrismaService],
      global: true,
      module: PrismaModule,
      providers: [
        {
          provide: PRISMA_CLIENT_TOKEN,
          useFactory: (options: ) => {
            return client
          }
        },
        PrismaService
      ]
    };
  }
}
