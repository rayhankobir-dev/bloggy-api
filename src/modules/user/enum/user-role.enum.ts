export enum UserRoleEnum {
  AUTHOR = 'AUTHOR',
  ADMIN = 'ADMIN',
}

export enum UserRoleDtoEnum {
  ADMIN = UserRoleEnum.AUTHOR,
  AUTHOR = UserRoleEnum.AUTHOR,
}
