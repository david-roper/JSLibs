import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

type User = {
  [key: string]: unknown;
  user: Record<string, unknown>;
};

type UserKey = keyof User;

type CustomRequest = Request & {
  user?: User;
};

export const RequestUser = createParamDecorator<UserKey, ExecutionContext>((key, context) => {
  const request = context.switchToHttp().getRequest<CustomRequest>();
  if (key) {
    return request.user?.[key];
  }
  return request.user;
});
