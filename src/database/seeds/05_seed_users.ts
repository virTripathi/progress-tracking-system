import { Knex } from 'knex';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  const BATCH_SIZE = 100;
  const TOTAL_USERS = 1000;
  const activeStatus = await knex('statuses').select('id').where({ label: 'active' }).first();
  const userRole = await knex('roles').select('id').where({ label: 'user' }).first();

  if (!activeStatus || !userRole) {
    throw new Error("Super Admin status or role does not exist in the database.");
  }

  for (let i = 0; i < TOTAL_USERS / BATCH_SIZE; i++) {
    const users = Array.from({ length: BATCH_SIZE }, () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      mobile_number: Math.random() > 0.5 ? faker.phone.number() : null,
      password: bcrypt.hash('Admin@123',10),
      remember_token: null,
      status_id: activeStatus.id,
      role_id: userRole.id,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await knex('users').insert(users);
    console.log(`Inserted batch ${i + 1} of ${TOTAL_USERS / BATCH_SIZE} users.`);
  }

  console.log("users seeded successfully.");
}