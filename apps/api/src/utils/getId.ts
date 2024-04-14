import type { ArrayValues } from 'type-fest';
import { typeidUnboxed } from 'typeid-js';

const types = [
  'usr', // user
  'org', // organisation
  'ses', // user session
] as const;

export function getId(prefix: ArrayValues<typeof types>): string {
  return typeidUnboxed(prefix);
}
