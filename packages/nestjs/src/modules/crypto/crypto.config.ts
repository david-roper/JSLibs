import { ConfigurableModuleBuilder } from '@nestjs/common';

interface CryptoModuleOptions {
  secretKey: string;
}

const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<CryptoModuleOptions>()
  .setExtras({ isGlobal: false }, (definition, extras) => ({
    ...definition,
    global: extras.isGlobal
  }))
  .build();

export {
  type CryptoModuleOptions,
  ConfigurableModuleClass as ConfigurableCryptoModule,
  MODULE_OPTIONS_TOKEN as CRYPTO_MODULE_OPTIONS_TOKEN
};
