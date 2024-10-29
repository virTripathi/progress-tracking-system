import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.table('users', (table) => {
        table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('SET NULL');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('users', (table) => {
        table.dropColumn('role_id');
    });
}
