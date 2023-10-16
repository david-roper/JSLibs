import { type ArgumentsHost, Catch, type ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { isObject } from '@nestjs/common/utils/shared.utils';
import { HttpAdapterHost } from '@nestjs/core';
import { type ZodType, z } from 'zod';

const httpExceptionSchema: ZodType<Pick<HttpException, 'getResponse' | 'getStatus'>> = z.object({
  getResponse: z.function().returns(z.any()),
  getStatus: z.function().returns(z.number())
});

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(ExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let statusCode: HttpStatus;
    let responseBody: object;
    if (this.isHttpException(exception)) {
      const res = exception.getResponse();
      statusCode = exception.getStatus();
      responseBody = isObject(res) ? res : { message: res, statusCode };
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      responseBody = {
        message: 'Internal Server Error',
        statusCode
      };
    }

    if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(exception);
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }

  private isHttpException(exception: unknown): exception is HttpException {
    // Cannot use instanceof HttpException due to potentially different prototype chain in library
    return httpExceptionSchema.safeParse(exception).success;
  }
}
