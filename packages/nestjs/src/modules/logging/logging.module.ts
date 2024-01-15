import { type DynamicModule, Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

@Module({})
export class LoggingModule {
  static forRoot(): DynamicModule {
    return {
      imports: [
        LoggerModule.forRoot({
          pinoHttp: {
            transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined
          }
        })
      ],
      module: LoggingModule
    };
  }
}
