import { type ArgumentsHost, Catch, type ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(ExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let httpStatus: HttpStatus;
    let message: unknown;
    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      message = JSON.parse(exception.message);
    } else {
      this.logger.error(exception);
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal Server Error';
    }

    const responseBody = {
      message,
      path: httpAdapter.getRequestUrl(ctx.getRequest()) as string,
      statusCode: httpStatus,
      timestamp: new Date().toISOString()
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
