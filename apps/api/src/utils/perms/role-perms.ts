import type { AppRoles, OrgRoles, ProjRoles } from './roles';

type Roles = AppRoles | OrgRoles | ProjRoles;

export const permissions: Record<Roles, string[]> = {
  'app:admin': ['READ:/user', 'READ:/user/*'],
  'app:support': ['READ:/user', 'READ:/user/*'],
  'org:admin': [],
  'org:translator': [],
  'proj:admin': [],
  'proj:maintainer': [],
  'proj:translator': [],
};
