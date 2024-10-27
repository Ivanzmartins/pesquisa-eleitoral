import { sequelize } from './src/db/database';
import { exec } from 'child_process';

import util from 'util';

const execPromise = util.promisify(exec);

beforeAll(async () => {
	await execPromise('npx sequelize-cli db:migrate --env test');
});

afterAll(async () => {
	await sequelize.close();
});

beforeEach(async () => {
	await sequelize.truncate({ cascade: true });
});
