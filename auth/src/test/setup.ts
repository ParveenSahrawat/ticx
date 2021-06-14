import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

declare global {
    namespace NodeJS {
        interface Global {
            signin(): Promise<string[]>;
        }
    }
}

let mongo: any;
const options = {
    useNewUrlParser: true,
    useNewUnifiedTopology: true
}
beforeAll(async () => {
    process.env.JWT_KEY = "asdfasdf";

    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, options);
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signin = async () => {
    const email = 'test@test.com';
    const password = 'asdfasdf';

    const res = await request(app)
        .post('/api/users/signup')
        .send({ email, password })
        .expect(201);

    const cookie = res.get('Set-Cookie');

    return cookie;
}