import express, { json } from 'express';
require('express-async-errors');

import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.set('trust proxy', true);//because traffic has been routed 
//to our app through ingress-nginx

app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test' ? true : false
}));

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };