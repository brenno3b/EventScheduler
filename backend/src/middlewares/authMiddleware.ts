import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

import AppError from '../errors/AppError';
import { verify } from '../libs/jwt';

export default function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) throw new AppError('Unauthorized', 401);

  const token = authorization.replace('Bearer', '').trim();

  try {
    const { userID } = verify(token) as JwtPayload;

    request.userID = userID;

    return next();
  } catch {
    throw new AppError('Unauthorized', 401);
  }
}
