import { ConfigurableModuleBuilder, Global, Module } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';

type DatabaseModuleOptions = {
  name: string;
  uri: string;
};

const DATABASE_CONNECTION_TOKEN = 'NATIVE_DATABASE_CONNECTION';

const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<DatabaseModuleOptions>()
  .setClassMethodName('forRoot')
  .build();

@Global()
@Module({
  providers: [
    {
      inject: [MODULE_OPTIONS_TOKEN],
      provide: DATABASE_CONNECTION_TOKEN,
      useFactory: async ({ name, uri }: DatabaseModuleOptions): Promise<Db> => {
        const client = new MongoClient(uri);
        await client.connect();
        return client.db(name);
      }
    }
  ]
})
export class DatabaseModule extends ConfigurableModuleClass {}
