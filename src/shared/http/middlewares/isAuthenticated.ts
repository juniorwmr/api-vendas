import { AppError } from '@shared/errors/AppError';
import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { secretKey } from '@config/auth';

interface ITokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader: string | undefined = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.');
  }

  const [, token]: string[] = authHeader.split(' ');

  try {
    const { id } = verify(token, secretKey) as ITokenPayload;

    request.user = {
      id,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT Token.');
  }
}
