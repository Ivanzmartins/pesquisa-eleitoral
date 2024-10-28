import { Router } from 'express';
import multer from 'multer';
import pollController from '../controllers/pollController';

const upload = multer({ dest: 'uploads/' });

const pollRouter = Router();

pollRouter.post('/', upload.single('file'), pollController.uploadPollData);

export default pollRouter;
