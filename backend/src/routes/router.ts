import { Router } from 'express';
import pollRouter from './pollRouter';

const router = Router();

router.get('/', async (_req, res) => {
  res.send('Hello, world!');
});

router.use('/poll', pollRouter);

export default router;
