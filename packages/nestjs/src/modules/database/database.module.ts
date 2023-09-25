import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigurableDatabaseModule } from './database.config';
import { DatabaseService } from './database.service';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [DatabaseService],
      useFactory: (databaseService: DatabaseService) => {
        return {
          ignoreUndefined: true,
          uri: databaseService.uri
        };
      }
    })
  ],
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class DatabaseModule extends ConfigurableDatabaseModule {}
