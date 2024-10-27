import app from './app';
import { connectDB } from './db/database';

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
	await connectDB();
	console.log(`Server is running on port ${PORT}`);
});
