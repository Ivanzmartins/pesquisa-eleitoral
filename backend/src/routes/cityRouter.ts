import { Router } from 'express';
import cityController from '../controllers/cityController';

const cityRouter = Router();

cityRouter.put('/update', cityController.updateCities);

export default cityRouter;
