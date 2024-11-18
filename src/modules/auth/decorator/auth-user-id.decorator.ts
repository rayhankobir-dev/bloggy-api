import { ObjectId } from 'mongodb';
import {
  createParamDecorator,
  ExecutionContext,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

const logger = new Logger('AuthUserId');

export const AuthUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): ITokenPayload => {
    const request = ctx.switchToHttp().getRequest();
    const tokenUser: ITokenPayload = request?.user;

    if (!tokenUser || !ObjectId.isValid(tokenUser?.userId)) {
      logger.error('Invalid user id: ', tokenUser?.userId);
      throw new UnauthorizedException('Invalid user id');
    }

    return tokenUser;
  },
);
