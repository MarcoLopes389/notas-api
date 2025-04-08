import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Socket } from 'socket.io';

export const UserRef = createParamDecorator(
  (data: string, ctx: ExecutionContext): any => {
    const wsData = ctx.switchToWs().getClient<Socket>()?.data;

    if (wsData) {
      const user = wsData.user;

      return data ? user[data] : user;
    }

    const request: Request = ctx.switchToHttp().getRequest();

    const user = request.user;

    if (!user) {
      return null;
    }

    return data ? user[data] : user;
  },
);
