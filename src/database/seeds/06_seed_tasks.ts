import { Knex } from 'knex';
import { faker } from '@faker-js/faker';

export async function seed(knex: Knex): Promise<void> {
  const BATCH_SIZE = 1000;
  const TOTAL_TASKS = 10000;
  const superAdmin = await knex('users').select('id').where({ email: 'superadmin@example.com' }).first();
  const activeStatus = await knex('statuses').select('id').where({ label: 'active' }).first();
  const taskTypeLesson = await knex('task_types').select('id').where({ label: 'lesson' }).first();
  const taskTypeChallenge = await knex('task_types').select('id').where({ label: 'challenge' }).first();

  if (!superAdmin || !activeStatus || !taskTypeLesson || !taskTypeChallenge) {
    throw new Error("Required data does not exist in the database. Please ensure necessary seed data exists.");
  }

  for (let i = 0; i < TOTAL_TASKS / BATCH_SIZE; i++) {
    const tasks = Array.from({ length: BATCH_SIZE }, () => ({
      title: faker.hacker.phrase(),
      description: faker.lorem.paragraphs(3),
      task_type_id: Math.random() > 0.5 ? taskTypeLesson.id : taskTypeChallenge.id,
      status_id: activeStatus.id,
      created_at: new Date(),
      created_by: superAdmin.id,
      updated_at: new Date(),
      updated_by: superAdmin.id,
    }));

    await knex('tasks').insert(tasks);
    console.log(`Inserted batch ${i + 1} of ${TOTAL_TASKS / BATCH_SIZE} tasks.`);
  }

  console.log("tasks seeded successfully.");
}
