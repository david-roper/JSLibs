import { Injectable } from '@nestjs/common';
import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { z } from 'zod';

const TransformableObjectSchema = z
  .object({
    toObject: z.function().args(z.object({ virtuals: z.boolean() }))
  })
  .passthrough()
  .transform((doc) => {
    const obj = doc.toObject({ virtuals: true }) as Record<string, unknown>;
    delete obj._id;
    delete obj.__v;
    return obj;
  });

const TransformableSchema = z.union([TransformableObjectSchema, z.array(TransformableObjectSchema)]);

@Injectable()
export class DocumentInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler<unknown>): Observable<unknown> {
    return next.handle().pipe(
      map((data) => {
        const result = TransformableSchema.safeParse(data);
        if (result.success) {
          return result.data;
        }
        return data;
      })
    );
  }
}
