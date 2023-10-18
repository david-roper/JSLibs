import { isValidObjectId } from 'mongoose';
import { z } from 'zod';

export const ObjectIdSchema = z.string().refine(isValidObjectId, {
  message: 'Invalid ObjectID'
});
