import app from './app';
import { runPopulationUpdateCron } from './cronjobs/PopulationUpdateCron';
import { connectDB } from './db/database';

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectDB();
  runPopulationUpdateCron();
  console.log(`Server is running on port ${PORT}`);
});
