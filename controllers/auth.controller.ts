import { NextFunction, Request, Response } from 'express';
import { OK, NOT_FOUND, BAD_REQUEST } from 'http-status-codes';
import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import config from '../bin/config';

import { IUser } from '../types';
import * as authService from '../services/auth.service';
import * as userService from '../services/user.service';

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(BAD_REQUEST).send();
    }
    const user: IUser = await authService.getByEmail(email);
    if (!user) {
      res.status(NOT_FOUND).send();
    }
    if (!compareSync(password, user.password)) {
      res.status(BAD_REQUEST).send();
    }
    const token = sign(
      {
        id: user._id,
      },
      config.SECRET_KEY,
    );
    delete user.password;
    res.status(OK).send({ ...user, token });
  } catch (err) {
    next(err);
  }
}

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password, email } = req.body;
    if (!username || !email || !password) {
      res.status(BAD_REQUEST).send();
    }
    const exist: number = await userService.count({ email });
    if (exist) {
      res.status(BAD_REQUEST).send();
    }

    const user: IUser = await userService.create({
      username,
      password,
      email,
    });

    const token = sign(
      {
        id: user._id,
      },
      config.SECRET_KEY,
    );
    delete user.password;
    res.status(OK).send({ ...user, token });
  } catch (err) {
    next(err);
  }
}
