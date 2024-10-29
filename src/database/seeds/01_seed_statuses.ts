import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    await knex('statuses').del();
    
    await knex('statuses').insert([
        { label: 'active', title: 'Active Status', is_active: true, is_inactive: false, created_at: new Date(), updated_at: new Date() },
        { label: 'inactive', title: 'Inactive Status', is_active: false, is_inactive: true, created_at: new Date(), updated_at: new Date() },
    ]);
}
