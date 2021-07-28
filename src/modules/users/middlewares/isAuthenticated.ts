import { AppError } from '@shared/errors/AppError';
import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { secretKey } from '@config/auth';

export function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodeToken = verify(token, secretKey);

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT Token.');
  }
}
