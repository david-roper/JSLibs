import { BadRequestException, Injectable, Optional, type PipeTransform } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class ParseIdPipe implements PipeTransform {
  isOptional: boolean;

  constructor(@Optional() options?: { isOptional?: boolean }) {
    this.isOptional = options?.isOptional ?? false;
  }

  transform(value: unknown) {
    if (this.isOptional && value === undefined) {
      return undefined;
    } else if (!ObjectId.isValid(String(value))) {
      throw new BadRequestException('Value cannot be coerced to object ID: ' + value);
    }
    return new ObjectId(String(value));
  }
}
