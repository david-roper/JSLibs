import { type DynamicModule, Module } from '@nestjs/common';
import type { Request, Response } from 'express';
import { LoggerModule } from 'nestjs-pino';
import type { DestinationStream } from 'pino';
import type { Options as PinoHttpOptions } from 'pino-http';
import PinoPretty from 'pino-pretty';

@Module({})
export class LoggingModule {
  static forRoot(): DynamicModule {
    return {
      imports: [
        LoggerModule.forRoot({
          pinoHttp: this.getPinoHttpOptions()
        })
      ],
      module: LoggingModule
    };
  }

  private static getPinoHttpOptions(): [PinoHttpOptions, DestinationStream] | undefined {
    if (process.env.NODE_ENV === 'production') {
      return;
    }
    return [
      {
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
}
