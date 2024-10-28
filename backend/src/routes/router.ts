import { Router } from 'express';
import pollRouter from './pollRouter';
import cityRouter from './cityRouter';

const router = Router();

router.get('/', async (_req, res) => {
  res.send('Hello, world!');
});

router.use('/poll', pollRouter);
router.use('/city', cityRouter);

export default router;
