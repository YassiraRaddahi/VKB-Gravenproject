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
    { id: 27, name: 'user.view.gender' },
    { id: 28, name: 'user.edit.gender' },
    { id: 29, name: 'user.view.date_of_birth' },
    { id: 30, name: 'user.edit.date_of_birth' },
    { id: 31, name: 'user.view.place_of_birth' },
    { id: 32, name: 'user.edit.place_of_birth' },
    { id: 33, name: 'user.view.address' },
    { id: 34, name: 'user.edit.address' },
    { id: 35, name: 'user.view.contact' },
    { id: 36, name: 'user.edit.contact' },
    { id: 37, name: 'user.view.profile_picture' },
    { id: 38, name: 'user.edit.profile_picture' },
    { id: 39, name: 'user.view.position' },
    { id: 40, name: 'user.edit.position' },
    { id: 41, name: 'user.view.role' },

    //admin permissions
    { id: 42, name: 'admin.view_settings' },
    { id: 43, name: 'admin.edit_settings' },
    { id: 44, name: 'admin.view_grave_settings' },
    { id: 45, name: 'admin.edit_grave_settings' },

    // dashboard permissions for the cemetery manager role
    { id: 46, name: 'view.dashboard.maindashboard.cemetery_manager' },
    { id: 47, name: 'view.dashboard.user_management' },
    { id: 48, name: 'view.dashboard.user_management.deceased' },
    { id: 49, name: 'view.dashboard.user_management.right_holders' },
    { id: 50, name: 'view.dashboard.user_management.grave_leaseholders' },
    { id: 51, name: 'view.dashboard.user_management.deceased.manage' },
    { id: 52, name: 'view.dashboard.user_management.deceased.link_to_grave' },
    { id: 53, name: 'view.dashboard.user_management.right_holders.manage' },
    { id: 54, name: 'view.dashboard.user_management.right_holders.link_to_grave' },
    { id: 55, name: 'view.dashboard.user_management.grave_leaseholders.manage' },
    { id: 56, name: 'view.dashboard.user_management.grave_leaseholders.link_to_grave' },
    
    //dimensions permissions
    { id: 57, name: 'user.view.grave_details' },
    { id: 58, name: 'manager.edit.grave_details' },

  ]);
};