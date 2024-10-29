import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('task_types', (table) => {
        table.increments('id').primary();
        table.string('label').notNullable();
        table.string('title').notNullable();
        table.text('description').nullable();
        table.integer('status_id').unsigned().references('id').inTable('statuses').onDelete('SET NULL');
        table.timestamps(true, true);
        table.integer('created_by').unsigned().nullable();
        table.integer('updated_by').unsigned().nullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('task_types');
}
