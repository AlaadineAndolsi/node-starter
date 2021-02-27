import { Router } from 'express';
import expressJwt from 'express-jwt';
import { authHandler } from '../../shared/middlewares';

import config from '../../bin/config';

import BaseRouter from './base.route';
import UserRouter from './user.route';

const router = Router();
router.use(
  expressJwt({
    algorithms: ['sha1', 'RS256', 'HS256'],
    secret: config.SECRET_KEY,
  }),
  authHandler,
);

router.use('/', BaseRouter);
router.use('/users', UserRouter);

export default router;
