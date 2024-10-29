import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('roles').del();
    const activeStatus = await knex('statuses').select('id').where({ label: 'active' }).first();
    if (!activeStatus) {
        throw new Error("The 'Active' status does not exist in the database. Please seed the statuses table first.");
      }
    // seed entries
    await knex('roles').insert([
        { label: 'super-admin', title: 'Super Administrator', status_id: activeStatus.id, created_at: new Date(), created_by: null, updated_at: new Date(), updated_by: null },
        { label: 'user', title: 'User', status_id: activeStatus.id, created_at: new Date(), created_by: null, updated_at: new Date(), updated_by: null },
    ]);
}
