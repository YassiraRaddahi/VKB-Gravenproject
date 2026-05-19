exports.seed = async function (knex) {
  await knex('permissions').del();
  await knex('permissions').insert([
    { id: 1, name: 'manager.create' },
    { id: 2, name: 'manager.edit' },
    { id: 3, name: 'manager.delete' },
 
    { id: 4, name: 'cemetery.create' },
    { id: 5, name: 'cemetery.edit' },
 
    { id: 6, name: 'grave_owner.create' },
    { id: 7, name: 'grave_owner.edit' },
    { id: 8, name: 'grave_owner.delete' },
 
    { id: 9, name: 'deceased.create' },
    { id: 10, name: 'deceased.edit' },
    { id: 11, name: 'deceased.delete' },
 
    { id: 12, name: 'grave.create' },
    { id: 13, name: 'grave.edit' },
    { id: 14, name: 'grave.delete' },
 
    { id: 15, name: 'grave_caretaker.create' },
    { id: 16, name: 'grave_caretaker.edit' },
    { id: 17, name: 'grave_caretaker.delete' },
 
    { id: 18, name: 'own_graves.view' },
    { id: 19, name: 'own_invoices.view' },
 
    { id: 20, name: 'grave_maintenance.view' },
 
    // user profile permissions
    { id: 21, name: 'user.view.name' },
    { id: 22, name: 'user.edit.name' },
    { id: 23, name: 'user.view.partner_name' },
    { id: 24, name: 'user.edit.partner_name' },
    { id: 25, name: 'user.view.name_usage' },
    { id: 26, name: 'user.edit.name_usage' },
    { id: 27, name: 'user.view.date_of_birth' },
    { id: 28, name: 'user.edit.date_of_birth' },
    { id: 29, name: 'user.view.place_of_birth' },
    { id: 30, name: 'user.edit.place_of_birth' },
    { id: 31, name: 'user.view.address' },
    { id: 32, name: 'user.edit.address' },
    { id: 33, name: 'user.view.contact' },
    { id: 34, name: 'user.edit.contact' },
    { id: 35, name: 'user.view.profile_picture' },
    { id: 36, name: 'user.edit.profile_picture' },
    { id: 37, name: 'user.view.position' },
    { id: 38, name: 'user.edit.position' },
    { id: 39, name: 'user.view.role' }
 
  ]);
};