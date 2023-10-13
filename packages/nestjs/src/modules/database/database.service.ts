import { Inject, Injectable } from '@nestjs/common';

import { DATABASE_MODULE_OPTIONS_TOKEN, type DatabaseModuleOptions } from './database.config';

@Injectable()
export class DatabaseService {
  constructor(@Inject(DATABASE_MODULE_OPTIONS_TOKEN) private readonly options: DatabaseModuleOptions) {}

  get connectionFactory() {
    return this.options.connectionFactory;
  }

  get uri() {
    return `${this.options.mongoUri}/${this.options.dbName}`;
  }
}
