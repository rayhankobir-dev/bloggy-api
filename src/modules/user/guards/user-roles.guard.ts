import { RequiredRoles } from '../decorator/roles.decorator';
import { UserRoleEnum } from '../enum/user-role.enum';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';

@Injectable()
export class UserRolesGuard implements CanActivate {
  private readonly logger = new Logger(UserRolesGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<UserRoleEnum[]>(
      RequiredRoles,
      context.getHandler(),
    );

    if (!roles || !Array.isArray(roles) || roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: ITokenPayload = request.user;

    if (!user || !roles.some((role: UserRoleEnum) => user.userRole === role)) {
      this.logger.error(
        `User does not have required roles: ${roles.join(', ')}`,
      );
      throw new ForbiddenException(
        'You are not authorized to perform this action',
      );
    }

    return true;
  }
}

export const RolesGuardProvider = {
  provide: APP_GUARD,
  useClass: UserRolesGuard,
};
