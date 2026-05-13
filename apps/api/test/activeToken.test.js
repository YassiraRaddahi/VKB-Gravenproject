import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../src/app.js'


describe('GET /api/active-token', () => {

  it('should return the active user when authenticated', async() => {

    const agent = request.agent(app);

    //login to get a valid token
    const loginResponse = await agent
      .post('/api/login')
      .send({ email: 'j.kempenaar@kerkrentmeester.nl', password: 'test123' })

    expect(loginResponse.status).toBe(200);
    
    // test case for valid token
    const response = await agent.get('/api/active-token')
    
    expect(response.status).toBe(200);

    // check expected user fields
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user).toHaveProperty('initials');
    expect(response.body.user).toHaveProperty('first_name');
    expect(response.body.user).toHaveProperty('infix');
    expect(response.body.user).toHaveProperty('last_name');
    expect(response.body.user).toHaveProperty('partner_infix');
    expect(response.body.user).toHaveProperty('partner_last_name');
    expect(response.body.user).toHaveProperty('name_usage');
    expect(response.body.user).toHaveProperty('date_of_birth');
    expect(response.body.user).toHaveProperty('place_of_birth');
    expect(response.body.user).toHaveProperty('street_name');
    expect(response.body.user).toHaveProperty('house_number');
    expect(response.body.user).toHaveProperty('house_letter');
    expect(response.body.user).toHaveProperty('house_number_addition');
    expect(response.body.user).toHaveProperty('zip_code');
    expect(response.body.user).toHaveProperty('city');
    expect(response.body.user).toHaveProperty('email');
    expect(response.body.user.email).toBe('j.kempenaar@kerkrentmeester.nl');
    expect(response.body.user).toHaveProperty('phone_number');
    expect(response.body.user).toHaveProperty('mobile_number');
    expect(response.body.user).toHaveProperty('profile_picture_url');
    expect(response.body.user).toHaveProperty('position');
    expect(response.body.user).toHaveProperty('role_name');
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


 // describe('admin', () => {
  //   it('returns full profile', () => {
  //     beforeEach(() => {
  //       // start transaction
  //     })

  //     afterEach(() => {
  //       // rollback transaction
  //     })
  //   })
  // })

  // describe('beheerder', () => {
  //   it('returns limited profile', () => {
  //     beforeEach(() => {
  //       // start transaction
  //     })

  //     afterEach(() => {
  //       // rollback transaction
  //     })
  //   })
  // })

  // describe('rechthebbende', () => {
  //   it('returns relation data', () => {
  //     beforeEach(() => {
  //       // start transaction
  //     })

  //     afterEach(() => {
  //       // rollback transaction
  //     })
  //   })
  // })

  // describe('grafonderhouder', () => {
  //   it('returns 401 without token', () => {
  //     beforeEach(() => {
  //       // start transaction
  //     })

  //     afterEach(() => {
  //       // rollback transaction
  //     })
  //   })
  // })
