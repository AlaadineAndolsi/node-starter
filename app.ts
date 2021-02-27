import cookieParser from 'cookie-parser';
import httpErrors from 'http-errors';
import logger from 'morgan';
import express from 'express';
import path from 'path';
import cors from 'cors';

import BaseRouter from './routes/base';
import ApiRouter from './routes/api';

import { errorHandler } from './shared/middlewares';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', BaseRouter);
app.use('/api', ApiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(httpErrors(404));
});

// error handler
app.use(errorHandler);

export default app;
