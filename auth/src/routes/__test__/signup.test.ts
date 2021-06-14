import request from 'supertest';
import { app } from '../../app';

it('Returns 201 on successfull signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({ email: "test3@test3.com", password: "123456" })
        .expect(201);
});

it('Returns a 400 with a invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'fnnvdfn',
            password: "nskl"
        })
        .expect(400);
});

it('Returns a 400 with a invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test3@test3.com',
            password: "ns"
        })
        .expect(400);
});

it('Returns a 400 with a empty params', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test3@test3.com',
        })
        .expect(400);

    await request(app)
        .post('/api/users/signup')
        .send({
            password: 'test3@test3.com',
        })
        .expect(400);
});

it('Disallows duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: "123456"
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: "123456"
        })
        .expect(400);
});

it('Sets a cookie after successfull signup', async () => {
    const res = await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: "123456"
        })
        .expect(201)

    expect(res.get('Set-Cookie')).toBeDefined();
});