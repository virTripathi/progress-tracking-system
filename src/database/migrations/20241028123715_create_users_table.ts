import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('mobile_number').nullable();
        table.string('password').notNullable();
        table.string('remember_token').nullable();
        table.integer('status_id').unsigned().references('id').inTable('statuses').onDelete('SET NULL');
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('users');
}
