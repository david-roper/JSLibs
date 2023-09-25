import { ConfigurableModuleBuilder } from '@nestjs/common';

interface DatabaseModuleOptions {
  mongoUri: string;
  dbName: string;
}

const builder = new ConfigurableModuleBuilder<DatabaseModuleOptions>().setClassMethodName('forRoot');

const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = builder.build();

export {
  type DatabaseModuleOptions,
  ConfigurableModuleClass as ConfigurableDatabaseModule,
  MODULE_OPTIONS_TOKEN as DATABASE_MODULE_OPTIONS_TOKEN
};
