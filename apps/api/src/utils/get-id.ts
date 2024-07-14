import type { ArrayValues } from 'type-fest';
import { typeidUnboxed } from 'typeid-js';

const types = [
  'usr', // user
  'ses', // user session
  'org', // organisation
  'orgmbr', // organisation member
  'orginv', // organisation invite
  'prj', // project
  'prjmbr', // project member
  'prjinv', // project invite
] as const;

export function getId(prefix: ArrayValues<typeof types>): string {
  return typeidUnboxed(prefix);
}
