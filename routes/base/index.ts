import { Router } from 'express';

import BaseRouter from './base.route';
import AuthRouter from './auth.route';

const router = Router();

router.use('/', BaseRouter);
router.use('/auth', AuthRouter);

export default router;
