import { UserRoleEnum } from '../enum/user-role.enum';
import { Reflector } from '@nestjs/core';

export const RequiredRoles = Reflector.createDecorator<UserRoleEnum[]>();
