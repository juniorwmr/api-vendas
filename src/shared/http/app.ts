import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { errors as celebrateErrors } from 'celebrate';
import { routes } from '@shared/http/routes';
import { AppError } from '@shared/errors/AppError';

export function App(server: express.Application) {
  server.use(cors());
  server.use(express.json());
  server.use('/v1', routes);

  server.use(celebrateErrors());
  server.use(
    (
      error: Error,
      request: Request,
      response: Response,
      next: NextFunction,
    ) => {
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
}
