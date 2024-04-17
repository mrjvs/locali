import type { AppRoles, OrgRoles, ProjRoles } from './roles';

type Roles = AppRoles | OrgRoles | ProjRoles;

export const basePerms: string[] = ['CREATE:/user'];

export const baseUserPerms: string[] = [
  'READ:/user/{usr}',
  'CREATE:/organisation',
];

export const rolePerms: Record<Roles, string[]> = {
  'app:admin': [
    'READ:/user',
    'READ:/user/*',
    'READ:/organisation',
    'READ:/organisation/*',
    'DELETE:/organisation/*',
  ],
  'app:support': [
    'READ:/user',
    'READ:/user/*',
    'READ:/organisation',
    'READ:/organisation/*',
  ],
  'org:admin': [
    'READ:/organisation/{org}',
    'DELETE:/organisation/{org}',
    'CREATE:/organisation/{org}/projects',
    'READ:/organisation/{org}/projects/*',
    'DELETE:/organisation/{org}/projects/*',
  ],
  'org:translator': [],
  'proj:admin': [],
  'proj:maintainer': [],
  'proj:translator': [],
};
