import { ConfigurableModuleBuilder } from '@nestjs/common';

interface CryptoModuleOptions {
  secretKey: string;
}

const { ConfigurableModuleClass: ConfigurableCryptoModule, MODULE_OPTIONS_TOKEN: CRYPTO_MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<CryptoModuleOptions>().build();

export { type CryptoModuleOptions, ConfigurableCryptoModule, CRYPTO_MODULE_OPTIONS_TOKEN };
