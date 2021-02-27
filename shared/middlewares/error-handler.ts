import { NextFunction, Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';

export async function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
  const body: any = {
    status: error?.status || INTERNAL_SERVER_ERROR,
    error: error?.name,
    message: error?.message,
  };
  res.status(body.status).send(body);
}
