import { z } from 'zod';
import type { Enum } from '../enum';

export const appRoles = {
  admin: 'app:admin', // system admin, can do everything
  support: 'app:support', // support agent, access to everything needed for customer service
} as const;
export type AppRoles = Enum<typeof appRoles>;
export const appRolesSchema = z.nativeEnum(appRoles);

export const orgRoles = {
  admin: 'org:admin', // organisation admin, can do everything on an org
  translator: 'org:translator', // translator, can translate on every project for org
} as const;
export type OrgRoles = Enum<typeof orgRoles>;
export const orgRolesSchema = z.nativeEnum(orgRoles);

export const projRoles = {
  admin: 'proj:admin', // project admin, can do everything on a project
  maintainer: 'proj:maintainer', // maintainer, can manage translations
  translator: 'proj:translator', // translator, can submit translations
} as const;
export type ProjRoles = Enum<typeof projRoles>;
export const projRolesSchema = z.nativeEnum(projRoles);
