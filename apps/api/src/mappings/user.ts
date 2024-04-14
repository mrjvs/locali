import type { User } from '@prisma/client';

export interface UserDto {
  id: string;
  email: string;
  createdAt: string;
}

export type ExpandedUserDto = UserDto;

export function mapUser(user: User): UserDto {
  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt.toISOString(),
  };
}

export function mapExpandedUser(user: User): ExpandedUserDto {
  return {
    ...mapUser(user),
  };
}
