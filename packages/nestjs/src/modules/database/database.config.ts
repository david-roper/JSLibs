import { ConfigurableModuleBuilder } from '@nestjs/common';

type DatabaseModuleOptions = {
  dbName: string;
  mongoUri: string;
}

const builder = new ConfigurableModuleBuilder<DatabaseModuleOptions>().setClassMethodName('forRoot');

const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = builder.build();

export {
  ConfigurableModuleClass as ConfigurableDatabaseModule,
  type DatabaseModuleOptions,
  MODULE_OPTIONS_TOKEN as DATABASE_MODULE_OPTIONS_TOKEN
};
