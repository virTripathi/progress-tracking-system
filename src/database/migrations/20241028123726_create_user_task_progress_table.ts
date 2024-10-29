import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('user_task_progress', (table) => {
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.integer('task_id').unsigned().references('id').inTable('tasks').onDelete('CASCADE');
        table.enu('status', ['pending', 'in_progress', 'completed']).notNullable();
        table.timestamp('started_at').nullable();
        table.timestamp('completed_at').nullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('user_task_progress');
}
