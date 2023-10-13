import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigurableDatabaseModule } from './database.config';
import { DatabaseService } from './database.service';

@Global()
@Module({
  exports: [DatabaseService],
  imports: [
    MongooseModule.forRootAsync({
      inject: [DatabaseService],
      useFactory: (databaseService: DatabaseService) => {
        return {
          connectionFactory: databaseService.connectionFactory,
          ignoreUndefined: true,
          uri: databaseService.uri
        };
      }
    })
  ],
  providers: [DatabaseService]
})
export class DatabaseModule extends ConfigurableDatabaseModule {}
