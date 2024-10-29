import { Knex } from 'knex';
import * as bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('users').del();

    const hashedPassword = await bcrypt.hash(process.env.SUPER_ADMIN_PASS??'dummy@pass', 10);
    const activeStatus = await knex('statuses').select('id').where({ label: 'active' }).first();
    if (!activeStatus) {
        throw new Error("The 'Active' status does not exist in the database. Please seed the statuses table first.");
    }

    const superAdminRole = await knex('roles').select('id').where({ label: 'super-admin' }).first();
    if (!superAdminRole) {
        throw new Error("The 'Super Admin' role does not exist in the database. Please seed the roles table first.");
    }

    await knex('users').insert([
        { name: 'Super Admin', email: process.env.SUPER_ADMIN_EMAIL??'superadmin@example.com', mobile_number: null, password: hashedPassword, remember_token: null, status_id: activeStatus.id, role_id: superAdminRole.id, created_at: new Date(), updated_at: new Date() },
    ]);
}
