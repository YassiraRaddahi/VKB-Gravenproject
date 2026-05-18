exports.seed = async function (knex) {
  await knex('permission_role').del();
  await knex('permission_role').insert([
    { role_id: 1, permission_id: 1 },
    { role_id: 1, permission_id: 2 },
    { role_id: 1, permission_id: 3 },
    { role_id: 1, permission_id: 4 },
    { role_id: 1, permission_id: 5 },
    { role_id: 2, permission_id: 6 },
    { role_id: 2, permission_id: 7 },
    { role_id: 2, permission_id: 8 },
    { role_id: 2, permission_id: 9 },
    { role_id: 2, permission_id: 10 },
    { role_id: 2, permission_id: 11 },
    { role_id: 2, permission_id: 12 },
    { role_id: 2, permission_id: 13 },
    { role_id: 2, permission_id: 14 },
    { role_id: 2, permission_id: 15 },
    { role_id: 2, permission_id: 16 },
    { role_id: 2, permission_id: 17 },
    { role_id: 3, permission_id: 18 },
    { role_id: 3, permission_id: 19 },
    { role_id: 4, permission_id: 20 },

    
    // user profile permissions
    
    //Admin (role_id: 1)
    { role_id: 1, permission_id: 21 }, // view.name
    { role_id: 1, permission_id: 22 }, // edit.name
    { role_id: 1, permission_id: 33 }, // view.contact
    { role_id: 1, permission_id: 34 }, // edit.contact
    { role_id: 1, permission_id: 35 }, // view.profile_picture
    { role_id: 1, permission_id: 36 }, // edit.profile_picture
    { role_id: 1, permission_id: 39 }, // view.role
    { role_id: 1, permission_id: 37 }, // view.position
    { role_id: 1, permission_id: 38 }, // edit.position

    
    //Beheerder (role_id: 2)
    { role_id: 2, permission_id: 21 }, // view.name
    { role_id: 2, permission_id: 22 }, // edit.name
    { role_id: 2, permission_id: 33 }, // view.contact
    { role_id: 2, permission_id: 34 }, // edit.contact
    { role_id: 2, permission_id: 35 }, // view.profile_picture
    { role_id: 2, permission_id: 36 }, // edit.profile_picture
    { role_id: 2, permission_id: 39 }, // view.role
    { role_id: 2, permission_id: 37 }, // view.position
    { role_id: 2, permission_id: 38 }, // edit.position

    //Rechthebbende (role_id: 3)
    { role_id: 3, permission_id: 21 }, // view.name
    { role_id: 3, permission_id: 22 }, // edit.name
    { role_id: 3, permission_id: 33 }, // view.contact
    { role_id: 3, permission_id: 34 }, // edit.contact
    { role_id: 3, permission_id: 35 }, // view.profile_picture
    { role_id: 3, permission_id: 36 }, // edit.profile_picture
    { role_id: 3, permission_id: 39 }, // view.role

    { role_id: 3, permission_id: 23 }, // view.partner_name
    { role_id: 3, permission_id: 24 }, // edit.partner_name
    { role_id: 3, permission_id: 25 }, // view.name_usage
    { role_id: 3, permission_id: 26 }, // edit.name_usage
    { role_id: 3, permission_id: 27 }, // view.date_of_birth
    { role_id: 3, permission_id: 29 }, // view.place_of_birth
    { role_id: 3, permission_id: 31 }, // view.address
    { role_id: 3, permission_id: 32 }, // edit.address

    //Grafonderhouders (role_id: 4)
    { role_id: 4, permission_id: 21 }, // view.name
    { role_id: 4, permission_id: 22 }, // edit.name
    { role_id: 4, permission_id: 33 }, // view.contact
    { role_id: 4, permission_id: 34 }, // edit.contact 
    { role_id: 4, permission_id: 35 }, // view.profile_picture
    { role_id: 4, permission_id: 36 }, // edit.profile_picture
    { role_id: 4, permission_id: 39 }, // view.role
    { role_id: 4, permission_id: 37 }, // view.position
    { role_id: 4, permission_id: 38 }, // edit.position

    
  
  ]);
};
