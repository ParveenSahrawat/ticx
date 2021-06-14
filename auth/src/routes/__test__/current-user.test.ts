import request from 'supertest';
import { app } from '../../app';

it('responds with the info about currentUser', async () => {
    const cookie = await global.signin();

    const res2 = await request(app)
        .get('/api/users/curentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200);

    expect(res2.body.currentUser.email).toEqual('test@test.com');
});

it('returns null if not authenticated', async () => {
    const res2 = await request(app)
        .get('/api/users/curentuser')
        .send()
        .expect(200);

    expect(res2.body.currentUser).toEqual(null);
});