import { z } from 'zod';

export function passwordSchema() {
  return z
    .string()
    .min(8)
    .max(256)
    .regex(/[0-9]/g, 'Password must have a number')
    .regex(/[^a-zA-Z0-9]/g, 'Password must have a special character');
}
