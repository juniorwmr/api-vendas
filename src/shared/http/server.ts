import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import '@shared/typeorm';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { errors as celebrateErrors } from 'celebrate';
import { pagination } from 'typeorm-pagination';

import { routes } from '@shared/http/routes';
import { AppError } from '@shared/errors/AppError';
import { rateLimiter } from './middlewares/rateLimiter';

const server = express();

server.use(cors());
server.use(express.json());

server.use(rateLimiter);

server.use(pagination);
server.use('/v1', routes);

server.use(celebrateErrors());
server.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.log(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

server.listen(process.env.APP_PORT || 3333, () =>
  console.log('Server running.'),
);
