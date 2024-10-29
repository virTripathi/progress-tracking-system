import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('statuses', (table) => {
        table.increments('id').primary();
        table.string('label').notNullable();
        table.string('title').notNullable();
        table.boolean('is_active').defaultTo(true);
        table.boolean('is_inactive').defaultTo(false);
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('statuses');
}
