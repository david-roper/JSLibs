import { Types, isValidObjectId } from 'mongoose';
import { z } from 'zod';

export const ObjectIdSchema = z
  .string()
  .refine(isValidObjectId, {
    message: 'Invalid ObjectID'
  })
  .transform((value) => new Types.ObjectId(value));
