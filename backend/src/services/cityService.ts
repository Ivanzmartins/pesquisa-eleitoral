import CityRepository from '../repository/CityRepository';
import { fetchPopulations } from '../utils/fetchPopulations';

class CityService {
  async updatePopulations() {
    try {
      const updates = await fetchPopulations();
      await CityRepository.updatePopulationByNameAndState(updates);
      return updates;
    } catch (error: any) {
      throw new Error(`Error updating populations: ${error.message}`);
    }
  }
}

export default new CityService();
