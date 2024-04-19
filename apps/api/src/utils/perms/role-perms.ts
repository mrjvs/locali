import type { AppRoles, OrgRoles, ProjRoles } from './roles';

type Roles = AppRoles | OrgRoles | ProjRoles;

export const basePerms: string[] = ['CREATE:/user'];

export const baseUserPerms: string[] = ['CREATE:/organisation'];

export const rolePerms: Record<Roles, string[]> = {
  'app:admin': [
    'LIST:/user',
    'READ:/user/*',
    'LIST:/organisation',
    'DELETE:/organisation/*',
  ],
  'app:support': ['LIST:/user', 'READ:/user/*', 'LIST:/organisation'],
  'org:admin': [
    'DELETE:/organisation/{org}',

    'LIST:/organisation/{org}/project',
    'CREATE:/organisation/{org}/project',
    'READ:/organisation/{org}/project/*',
    'DELETE:/organisation/{org}/project/*',

    'LIST:/organisation/{org}/member',
    'CREATE:/organisation/{org}/member',
    'READ:/organisation/{org}/member/*',
    'DELETE:/organisation/{org}/member/*',

    'LIST:/organisation/{org}/project/*/member',
    'CREATE:/organisation/{org}/project/*/member',
    'READ:/organisation/{org}/project/*/member/*',
    'DELETE:/organisation/{org}/project/*/member/*',
  ],
  'org:translator': [],
  'proj:admin': [],
  'proj:maintainer': [],
  'proj:translator': [],
};
