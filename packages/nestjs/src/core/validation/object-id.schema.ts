import { Types, isValidObjectId } from 'mongoose';
import { z } from 'zod';

export const objectIdStringSchema = z.string().refine(isValidObjectId, {
  message: 'Invalid ObjectID'
});

export const objectIdSchema = objectIdStringSchema.transform((value) => new Types.ObjectId(value));
