import { ConfigurableModuleBuilder } from '@nestjs/common';

interface CryptoModuleOptions {
  secretKey: string;
}

const { ConfigurableModuleClass: ConfigurableCryptoModule, MODULE_OPTIONS_TOKEN: CRYPTO_MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<CryptoModuleOptions>()
    .setClassMethodName('forRoot')
    .setExtras({ isGlobal: false }, (definition, extras) => ({
      ...definition,
      global: extras.isGlobal
    }))
    .build();

export { type CryptoModuleOptions, ConfigurableCryptoModule, CRYPTO_MODULE_OPTIONS_TOKEN };
