import { type DynamicModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import type { Request, Response } from 'express';
import { LoggerModule } from 'nestjs-pino';
import { LoggerErrorInterceptor } from 'nestjs-pino';
import type { DestinationStream } from 'pino';
import type { Options as PinoHttpOptions } from 'pino-http';
import PinoPretty from 'pino-pretty';

@Module({})
export class LoggingModule {
  static forRoot(): DynamicModule {
    return {
      global: true,
      imports: [
        LoggerModule.forRoot({
          pinoHttp: this.getPinoHttpOptions()
        })
      ],
      module: LoggingModule,
      providers: this.getProviders()
    };
  }

  private static getPinoHttpOptions(): [PinoHttpOptions, DestinationStream] | undefined {
    if (process.env.NODE_ENV === 'production') {
      return;
    }
    return [
      {
        customLogLevel: (_, res) => {
          return res.statusCode >= 500 ? 'error' : 'info';
        },
        serializers: {
          req: (req: Request) => {
            return `${req.method} ${req.url}`;
          },
          res: (res: Response) => {
            return res.statusCode;
          }
        },
        wrapSerializers: false
      },
      PinoPretty({
        colorize: true
      })
    ];
  }

  private static getProviders() {
    if (process.env.NODE_ENV === 'production') {
      return;
    }
    return [
      {
        provide: APP_INTERCEPTOR,
        useClass: LoggerErrorInterceptor
      }
    ];
  }
}
