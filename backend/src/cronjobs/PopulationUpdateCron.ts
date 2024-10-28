import CityRepository from '../repository/CityRepository';
import { fetchPopulations } from '../utils/fetchPopulations';
import cron from 'node-cron';

const updatePopulationData = async () => {
  try {
    const lastUpdate = await CityRepository.lastPopulationUpdate();
    if (lastUpdate === 'No population updates found') {
      console.log('No population updates found');
      return;
    }

    const daysSinceLastUpdate = Math.floor((Date.now() - new Date(lastUpdate).getTime()) / (1000 * 60 * 60 * 24));
    const newValues = await fetchPopulations();

    if (daysSinceLastUpdate > 30) {
      await CityRepository.updatePopulationByNameAndState(newValues);
      console.log('Population data updated successfully');
    } else {
      console.log('Population data is up to date, no update needed');
    }
  } catch (error) {
    console.error('Error updating population data:', error);
  }
};

export async function runPopulationUpdateCron() {
  cron.schedule('0 0 1 * *', updatePopulationData);
}
