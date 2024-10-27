import { Router } from 'express';
import energyInvoiceRouter from './energy.router';

const router = Router();

router.get('/', async (_req, res) => {
	res.send('Hello, world!');
});

router.use('/energy', energyInvoiceRouter);

export default router;
