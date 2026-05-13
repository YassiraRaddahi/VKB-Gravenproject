import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../src/app.js'

const permissionFieldMap = {
    'user.view.name': [
      'initials',
      'first_name',
      'infix',
      'last_name'
    ],

    'user.view.partner_name': [
      'partner_infix',
      'partner_last_name'
    ],

    'user.view.name_usage': ['name_usage'],

    'user.view.date_of_birth': ['date_of_birth'],
    'user.view.place_of_birth': ['place_of_birth'],

    'user.view.address': [
      'street_name',
      'house_number',
      'house_letter',
      'house_number_addition',
      'zip_code',
      'city'
    ],

    'user.view.contact': [
      'email',
      'phone_number',
      'mobile_number'
    ],

    'user.view.profile_picture': [
      'profile_picture_url'
    ],

    'user.view.position': ['position'],
    'user.view.role': ['role_name']
  };

describe('GET /api/active-token', ()  => {

  it('should return correct fields for the admin', async () => {
     const agent = request.agent(app);

    //login as admin to get a valid token
    const loginResponse = await agent
      .post('/api/login')
      .send({ email: 'j.kempenaar@kerkrentmeester.nl', password: 'test123' })

    expect(loginResponse.status).toBe(200);
    
    // test case for valid token
    const response = await agent.get('/api/active-token')
    
    expect(response.status).toBe(200);

    // the admin
    const user = response.body.user;
    const permissions = response.body.permissions;

    expect(user).toBeDefined();
    expect(permissions).toBeDefined();

    // checks that the user object is not empty
    expect(Object.keys(user).length).toBeGreaterThan(0);

    // check expected permissions for admin

    expect(Array.isArray(permissions)).toBe(true);


    const expectedPermissions = [
      'user.view.name',
      'user.edit.name',
      'user.view.contact',
      'user.edit.contact',
      'user.view.profile_picture',
      'user.edit.profile_picture',
      'user.view.role',
      'user.view.position',
      'user.edit.position'
    ];

    expectedPermissions.forEach(permission => {
      expect(permissions).toContain(permission);
    });


    // check that admin does not have permissions that should be hidden
    const hiddenPermissions = [
      'user.view.partner_name',
      'user.edit.partner_name',
      'user.view.name_usage',
      'user.edit.name_usage',
      'user.view.date_of_birth',
      'user.view.place_of_birth',
      'user.view.address'
    ];

    hiddenPermissions.forEach(permission => {
      expect(permissions).not.toContain(permission);
    });

    // check expected user fields for admin
    Object.entries(permissionFieldMap).forEach(([permission, fields]) => {
      if (permissions.includes(permission)) {
        fields.forEach(field => {
          expect(user).toHaveProperty(field);
        });
      }
    });

     // checks absence of user fields that should be hidden for admin
    Object.entries(permissionFieldMap).forEach(([permission, fields]) => {
      if (!permissions.includes(permission)) {
        fields.forEach(field => {
          expect(user).not.toHaveProperty(field);
        });
      }
    });

    
    // checks that all returned user fields are allowed by the permissions
    Object.keys(user).forEach(field => {
      
      if(field === 'id') return;
      
      const isAllowed = Object.entries(permissionFieldMap).some(
        ([permission, fields]) =>
          permissions.includes(permission) && fields.includes(field)
      );

      expect(isAllowed).toBe(true);
    });


  })

  it('should return correct fields for the cemetery manager', async () => {
    const agent = request.agent(app);

    //login as cemetery manager to get a valid token
    const loginResponse = await agent
      .post('/api/login')
      .send({ email: 'liza2511liza@gmail.com', password: 'test123' })

    expect(loginResponse.status).toBe(200);
    
    // test case for valid token
    const response = await agent.get('/api/active-token')
    
    expect(response.status).toBe(200);

    // the cemetery manager
    const user = response.body.user;
    const permissions = response.body.permissions;

    expect(user).toBeDefined();
    expect(permissions).toBeDefined();

    // checks that the user object is not empty
    expect(Object.keys(user).length).toBeGreaterThan(0);

    // check expected permissions for cemetery manager

    expect(Array.isArray(permissions)).toBe(true);


    const expectedPermissions = [
      'user.view.name',
      'user.edit.name',
      'user.view.contact',
      'user.edit.contact',
      'user.view.profile_picture',
      'user.edit.profile_picture',
      'user.view.role',
      'user.view.position',
      'user.edit.position'
    ];

    expectedPermissions.forEach(permission => {
      expect(permissions).toContain(permission);
    });


    // check that cemetery manager does not have permissions that should be hidden
    const hiddenPermissions = [
      'user.view.partner_name',
      'user.edit.partner_name',
      'user.view.name_usage',
      'user.edit.name_usage',
      'user.view.date_of_birth',
      'user.view.place_of_birth',
      'user.view.address'
    ];

    hiddenPermissions.forEach(permission => {
      expect(permissions).not.toContain(permission);
    });

    // check expected user fields for cemetery manager
    Object.entries(permissionFieldMap).forEach(([permission, fields]) => {
      if (permissions.includes(permission)) {
        fields.forEach(field => {
          expect(user).toHaveProperty(field);
        });
      }
    });

     // checks absence of user fields that should be hidden for cemetery manager
    Object.entries(permissionFieldMap).forEach(([permission, fields]) => {
      if (!permissions.includes(permission)) {
        fields.forEach(field => {
          expect(user).not.toHaveProperty(field);
        });
      }
    });

    
    // checks that all returned user fields are allowed by the permissions
    Object.keys(user).forEach(field => {
      
      if(field === 'id') return;
      
      const isAllowed = Object.entries(permissionFieldMap).some(
        ([permission, fields]) =>
          permissions.includes(permission) && fields.includes(field)
      );

      expect(isAllowed).toBe(true);
    });


  })

   it('should return correct fields for the grave owner', async () => {
    const agent = request.agent(app);

    //login as grave owner to get a valid token
    const loginResponse = await agent
      .post('/api/login')
      .send({ email: 'yassiraraddahi@gmail.com', password: 'test123' })

    expect(loginResponse.status).toBe(200);
    
    // test case for valid token
    const response = await agent.get('/api/active-token')
    
    expect(response.status).toBe(200);

    // the grave owner
    const user = response.body.user;
    const permissions = response.body.permissions;

    expect(user).toBeDefined();
    expect(permissions).toBeDefined();

    // checks that the user object is not empty
    expect(Object.keys(user).length).toBeGreaterThan(0);

    // check expected permissions for grave owner
    expect(Array.isArray(permissions)).toBe(true);

    const expectedPermissions = [
      'user.view.name',
      'user.edit.name',
      'user.view.contact',
      'user.edit.contact',
      'user.view.profile_picture',
      'user.edit.profile_picture',
      'user.view.role',
      'user.view.partner_name',
      'user.edit.partner_name',
      'user.view.name_usage',
      'user.edit.name_usage',
      'user.view.date_of_birth',
      'user.view.place_of_birth',
      'user.view.address',
      'user.edit.address'
    ];

    expectedPermissions.forEach(permission => {
      expect(permissions).toContain(permission);
    });


    // check that grave owner does not have permissions that should be hidden
    const hiddenPermissions = [
      'user.view.position',
      'user.edit.position'
    ];

    hiddenPermissions.forEach(permission => {
      expect(permissions).not.toContain(permission);
    });

    // check expected user fields for grave owner
    Object.entries(permissionFieldMap).forEach(([permission, fields]) => {
      if (permissions.includes(permission)) {
        fields.forEach(field => {
          expect(user).toHaveProperty(field);
        });
      }
    });

     // checks absence of user fields that should be hidden for grave owner
    Object.entries(permissionFieldMap).forEach(([permission, fields]) => {
      if (!permissions.includes(permission)) {
        fields.forEach(field => {
          expect(user).not.toHaveProperty(field);
        });
      }
    });

    
    // checks that all returned user fields are allowed by the permissions
    Object.keys(user).forEach(field => {
      
      if(field === 'id') return;
      
      const isAllowed = Object.entries(permissionFieldMap).some(
        ([permission, fields]) =>
          permissions.includes(permission) && fields.includes(field)
      );

      expect(isAllowed).toBe(true);
    });

  })

   it('should return correct fields for the grave caretaker', async () => {
    
     const agent = request.agent(app);

    //login as grave caretaker to get a valid token
    const loginResponse = await agent
      .post('/api/login')
      .send({ email: 'lisa.devries@gmail.com', password: 'test123' })

    expect(loginResponse.status).toBe(200);
    
    // test case for valid token
    const response = await agent.get('/api/active-token')
    
    expect(response.status).toBe(200);

    // the grave caretaker
    const user = response.body.user;
    const permissions = response.body.permissions;

    expect(user).toBeDefined();
    expect(permissions).toBeDefined();

    // checks that the user object is not empty
    expect(Object.keys(user).length).toBeGreaterThan(0);

    // check expected permissions for grave caretaker
    expect(Array.isArray(permissions)).toBe(true);

    const expectedPermissions = [
     'user.view.name',
      'user.edit.name',
      'user.view.contact',
      'user.edit.contact',
      'user.view.profile_picture',
      'user.edit.profile_picture',
      'user.view.role',
      'user.view.position',
      'user.edit.position'
    ];

    expectedPermissions.forEach(permission => {
      expect(permissions).toContain(permission);
    });


    // check that grave caretaker does not have permissions that should be hidden
    const hiddenPermissions = [
      'user.view.partner_name',
      'user.edit.partner_name',
      'user.view.name_usage',
      'user.edit.name_usage',
      'user.view.date_of_birth',
      'user.view.place_of_birth',
      'user.view.address'
    ];

    hiddenPermissions.forEach(permission => {
      expect(permissions).not.toContain(permission);
    });

    // check expected user fields for grave caretaker
    Object.entries(permissionFieldMap).forEach(([permission, fields]) => {
      if (permissions.includes(permission)) {
        fields.forEach(field => {
          expect(user).toHaveProperty(field);
        });
      }
    });

     // checks absence of user fields that should be hidden for grave caretaker
    Object.entries(permissionFieldMap).forEach(([permission, fields]) => {
      if (!permissions.includes(permission)) {
        fields.forEach(field => {
          expect(user).not.toHaveProperty(field);
        });
      }
    });

    
    // checks that all returned user fields are allowed by the permissions
    Object.keys(user).forEach(field => {
      
      if(field === 'id') return;
      
      const isAllowed = Object.entries(permissionFieldMap).some(
        ([permission, fields]) =>
          permissions.includes(permission) && fields.includes(field)
      );

      expect(isAllowed).toBe(true);
    });

  })

  // test case for missing token
  it('should return 401 when no token is provided', async() => {

    const response = await request(app).get('/api/active-token')
    expect(response.status).toBe(401);
  })

  // test case for invalid token
  it('should return 401 when an invalid token is provided', async() => {

    const response = await request(app)
      .get('/api/active-token')
      .set('Cookie', 'token=invalidtoken');

    expect(response.status).toBe(401);
  })  

})