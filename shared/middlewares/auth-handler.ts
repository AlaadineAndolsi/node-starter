import { NextFunction, Request, Response } from 'express';
import httpErrors from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import { IUser } from '../../types';
import * as authService from '../../services/auth.service';

export async function authHandler(req: Request, res: Response, next: NextFunction) {
  try {
    // @ts-ignore
    const { user } = req;
    // @ts-ignore
    const usr: IUser = await authService.getById(user?.id);
    if (!usr) {
      throw httpErrors(StatusCodes.UNAUTHORIZED);
    } else {
      req.user = usr;
      next();
    }
  } catch (err) {
    next(err);
  }
}
