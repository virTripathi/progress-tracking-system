import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    await knex('task_types').del();
    const activeStatus = await knex('statuses').select('id').where({ label: 'active' }).first();
    if (!activeStatus) {
        throw new Error("The 'Active' status does not exist in the database. Please seed the statuses table first.");
    }

    // seed entries
    await knex('task_types').insert([
        { label: 'lesson', title: 'Lesson', description: 'Learning lessons for users.', status_id: activeStatus.id, created_at: new Date(), created_by: null, updated_at: new Date(), updated_by: null },
        { label: 'challenge', title: 'Challenge', description: 'Challenges to test user skills.', status_id: activeStatus.id, created_at: new Date(), created_by: null, updated_at: new Date(), updated_by: null },
    ]);
}
