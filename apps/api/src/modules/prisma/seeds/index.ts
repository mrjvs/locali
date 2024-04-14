import { seedUsers } from './users';

export async function runSeeding() {
  await seedUsers();
}
