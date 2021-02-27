import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Endpoint work!!');
});

export default router;
