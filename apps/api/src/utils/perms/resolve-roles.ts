import type { OrgMember, Project, ProjectMember, User } from '@prisma/client';
import type { PermissionContext } from '@repo/perms';
import { resolvePermissionWithContext } from '@repo/perms';
import { basePerms, baseUserPerms, rolePerms } from './role-perms';

const rolePermsMap: Record<string, undefined | string[]> = rolePerms;

export function resolvePermsWithContext(
  perms: string[],
  context: PermissionContext,
) {
  return perms.map((perm) => resolvePermissionWithContext(perm, context));
}

export function resolveAppRoles(roles: string[]): string[] {
  return resolvePermsWithContext(
    roles.map((v) => rolePermsMap[v] ?? []).flat(),
    {},
  );
}

export function resolveUserPerms(userId: string): string[] {
  return resolvePermsWithContext(baseUserPerms, { usr: userId });
}

export function resolveOrgRoles(orgId: string, roles: string[]): string[] {
  return resolvePermsWithContext(
    roles.map((v) => rolePermsMap[v] ?? []).flat(),
    {
      org: orgId,
    },
  );
}

export function resolveProjectRoles(
  orgId: string,
  projectId: string,
  roles: string[],
): string[] {
  return resolvePermsWithContext(
    roles.map((v) => rolePermsMap[v] ?? []).flat(),
    {
      org: orgId,
      prj: projectId,
    },
  );
}

type PopulatedOrgMember = OrgMember;
type PopulatedProjectMember = ProjectMember & { project: Project };
export type PopulatedUser = User & {
  orgMembers: PopulatedOrgMember[];
  projectMembers: PopulatedProjectMember[];
};

export function resolveRolesForUser(user: PopulatedUser): string[] {
  return [
    basePerms,
    resolveAppRoles(user.roles),
    resolveUserPerms(user.id),
    user.orgMembers.map((member) =>
      resolveOrgRoles(member.orgId, member.roles),
    ),
    user.projectMembers.map((member) =>
      resolveProjectRoles(member.project.orgId, member.projectId, member.roles),
    ),
  ].flat(3);
}
