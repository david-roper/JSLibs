/* eslint-disable @typescript-eslint/no-explicit-any */

import { type DynamicModule, Global, Module } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';
import type { Promisable } from 'type-fest';

type DatabaseModuleOptions = {
  dbName: string;
  uri: string;
};

type DatabaseModuleAsyncOptions = {
  inject?: any[];
  useFactory: (...args: any[]) => Promisable<DatabaseModuleOptions>;
};

const MODULE_OPTIONS_TOKEN = 'DATABASE_MODULE_OPTIONS';

const DATABASE_CONNECTION_TOKEN = 'NATIVE_DATABASE_CONNECTION';

@Global()
@Module({})
export class DatabaseModule {
  static forRootAsync(options: DatabaseModuleAsyncOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          inject: options.inject,
          provide: MODULE_OPTIONS_TOKEN,
          useFactory: options.useFactory
        },
        {
          inject: [MODULE_OPTIONS_TOKEN],
          provide: DATABASE_CONNECTION_TOKEN,
          useFactory: async ({ dbName, uri }: DatabaseModuleOptions): Promise<Db> => {
            const client = new MongoClient(uri);
            await client.connect();
            return client.db(dbName);
          }
        }
      ]
    };
  }
  static forFeature();
}
