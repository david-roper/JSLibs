import { type ExecutionContext, createParamDecorator } from '@nestjs/common';

import type { AppRequest } from '../types';
/**
 * Extract the user from the request object
 * @param key - the key of the user object to extract, or omit for the entire user
 */
export const CurrentUser = createParamDecorator<keyof AppRequest['user'], ExecutionContext>((key, context) => {
  const request = context.switchToHttp().getRequest<AppRequest>();
  if (key) {
    return request.user?.[key];
  }
  return request.user;
});
