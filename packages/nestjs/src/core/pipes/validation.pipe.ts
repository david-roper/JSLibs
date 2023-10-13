import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import type { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { ZodType } from 'zod';

@Injectable()
export class ValidationPipe implements PipeTransform {
  private readonly logger = new Logger(ValidationPipe.name);
  private readonly reflector = new Reflector();

  async transform<T extends ZodType<object>>(value: T, { metatype, type }: ArgumentMetadata) {
    if (type !== 'body') {
      return value;
    } else if (!metatype) {
      throw new InternalServerErrorException('Metatype must be defined!');
    }

    const schema = this.reflector.get<T | undefined>('ValidationSchema', metatype);
    if (!schema) {
      throw new InternalServerErrorException('Schema must be defined!');
    }

    this.logger.verbose(`Attempting to validate value: ${JSON.stringify(value)}`);
    const result = await schema.safeParseAsync(value);
    if (result.success) {
      return result.data;
    }
    throw new BadRequestException(result.error);
  }
}
