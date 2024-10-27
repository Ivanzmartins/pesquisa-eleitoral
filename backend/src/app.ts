import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/router';

dotenv.config();

const app = express();

app.use(cors());

app.use('/', router);

// Error handling middleware
// TODO: CREATE A CUSTOM ERROR HANDLING MIDDLEWARE IN THE PROPER LOCATION
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
	console.error(err.stack);
	res.status(500).json({ message: err.message || 'Internal Server Error' });
});

app.use(express.json());

export default app;
