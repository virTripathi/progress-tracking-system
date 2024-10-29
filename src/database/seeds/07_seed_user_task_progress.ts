import { Knex } from 'knex';
import { faker } from '@faker-js/faker';

export async function seed(knex: Knex): Promise<void> {
  const BATCH_SIZE = 1000;
  const TOTAL_PROGRESS_RECORDS = 10000;
  const taskStatuses = ['pending', 'in_progress', 'completed'];

  const userIds = await knex('users').pluck('id');
  const taskIds = await knex('tasks').pluck('id');

  if (userIds.length === 0 || taskIds.length === 0) {
    throw new Error("No users or tasks found. Ensure users and tasks are seeded before seeding user_task_progress.");
  }

  for (let i = 0; i < TOTAL_PROGRESS_RECORDS / BATCH_SIZE; i++) {
    const progressRecords = Array.from({ length: BATCH_SIZE }, () => {
      const status = faker.helpers.arrayElement(taskStatuses);

      const startedAt = status !== 'pending' ? faker.date.past() : null;
      const completedAt = status === 'completed' && startedAt 
    ? new Date(startedAt.getTime() + 24 * 60 * 60 * 1000)
    : null;

      return {
        user_id: faker.helpers.arrayElement(userIds),
        task_id: faker.helpers.arrayElement(taskIds),
        status,
        started_at: startedAt,
        completed_at: completedAt,
        created_at: new Date(),
        updated_at: new Date(),
      };
    });

    await knex('user_task_progress').insert(progressRecords);
    console.log(`Inserted batch ${i + 1} of ${TOTAL_PROGRESS_RECORDS / BATCH_SIZE} for user_task_progress.`);
  }

  console.log("User-task progress records seeded successfully.");
}
