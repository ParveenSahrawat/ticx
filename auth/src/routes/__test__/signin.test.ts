import request from 'supertest';
import { app } from '../../app';

it('Fails when a incorrect email is supplied', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: "test@tes.com",
            password: "123456"
        })
        .expect(400);
});

it('Fails when an incorrect password issupplied', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: "123456"
        })
        .expect(201);

    await request(app)
        .post('/api/users/signin')
        .send({
            email: "test@test.com",
            password: "12334456"
        })
        .expect(400);
});

it('responds with a cookie with valid credentials', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: "123456"
        })
        .expect(201);

    const res = await request(app)
        .post('/api/users/signin')
        .send({
            email: "test@test.com",
            password: "123456"
        })
        .expect(200);

    expect(res.get('Set-Cookie')).toBeDefined();
});