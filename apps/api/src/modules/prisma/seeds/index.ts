import { seedOrgs } from './orgs';
import { seedProjects } from './projects';
import { seedUsers } from './users';

export async function runSeeding() {
  await seedUsers();
  await seedOrgs();
  await seedProjects();
}
