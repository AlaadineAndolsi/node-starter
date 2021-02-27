import { NextFunction, Request, Response } from 'express';
import { UNAUTHORIZED } from 'http-status-codes';

import { IUser } from '../../types';
import * as authService from '../../services/auth.service';

export async function authHandler(req: Request, res: Response, next: NextFunction) {
  try {
    // @ts-ignore
    const { user } = req;
    // @ts-ignore
    const usr: IUser = await authService.getById(user?.id);
    if (!usr) {
      res.status(UNAUTHORIZED).send();
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}
