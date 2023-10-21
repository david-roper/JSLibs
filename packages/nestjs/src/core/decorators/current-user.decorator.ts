import { type ExecutionContext, createParamDecorator } from '@nestjs/common';
import { type Request } from 'express';

// This should be augmented in the implementation
// See https://stackoverflow.com/questions/66312048/cant-override-express-request-user-type-but-i-can-add-new-properties-to-reques
type AppRequest = Request & {
  user: object;
};

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
