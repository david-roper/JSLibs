import { type ExecutionContext, createParamDecorator } from '@nestjs/common';
import { type Request } from 'express';

type User = {
  [key: string]: unknown;
  user: Record<string, unknown>;
};

type UserKey = keyof User;

type CustomRequest = Request & {
  user?: User;
};
/**
 * Extract the user from the request object
 * @param key - the key of the user object to extract, or omit for the entire user
 */
export const RequestUser = createParamDecorator<UserKey, ExecutionContext>((key, context) => {
  const request = context.switchToHttp().getRequest<CustomRequest>();
  if (key) {
    return request.user?.[key];
  }
  return request.user;
});
