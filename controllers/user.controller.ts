import { NextFunction, Request, Response } from 'express';
import { OK, NOT_FOUND } from 'http-status-codes';

import { IUser } from '../types';
import * as userService from '../services/user.service';

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    console.log('called');
    const data: IUser[] = await userService.getAll();
    res.status(OK).send(data);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const data: IUser = await userService.getById(id);
    if (data) {
      res.status(OK).send(data);
    } else {
      res.status(NOT_FOUND).send();
    }
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password, email } = req.body;
    const data: IUser = await userService.create({
      username,
      password,
      email,
    });
    res.status(OK).send(data);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { username, password, email } = req.body;
    const data: IUser = await userService.update(id, {
      username,
      password,
      email,
    });
    if (data) {
      res.status(OK).send(data);
    } else {
      res.status(NOT_FOUND).send();
    }
  } catch (err) {
    next(err);
  }
}

export async function updateAll(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password, email } = req.body;

    const data: IUser[] = await userService.updateAll({
      username,
      password,
      email,
    });
    res.status(OK).send(data);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const data: IUser = await userService.remove(id);
    if (data) {
      res.status(OK).send(data);
    } else {
      res.status(NOT_FOUND).send();
    }
  } catch (err) {
    next(err);
  }
}

export async function removeAll(req: Request, res: Response, next: NextFunction) {
  try {
    const data: IUser[] = await userService.removeAll();
    res.status(OK).send(data);
  } catch (err) {
    next(err);
  }
}
