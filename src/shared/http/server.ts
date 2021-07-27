import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { router } from './routes';
import { AppError } from '../errors/AppError';

const app = express();

app.use(cors());
app.use(router);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response
        .status(error.statusCode)
        .json({ status: 'error', message: error.message });
    }
    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  },
);

app.listen(3333, () => console.log('Server running.'));
