import { QueryTypes } from 'sequelize';
import { City } from '../db/models';

class CityRepository {
  async findAll() {
    return City.findAll();
  }

  async lastPopulationUpdate(): Promise<Date | string> {
    try {
      const lastUpdated = await City.findOne({
        order: [['updated_at', 'DESC']],
      });
      if (lastUpdated && lastUpdated.updatedAt) {
        return lastUpdated.updatedAt;
      }
      return 'No population updates found';
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting last population update: ${error.message}`);
      } else {
        throw new Error('Error getting last population update');
      }
    }
  }

  async updatePopulationByNameAndState(updates: { name: string; state: string; population: number }[], batchSize = 500) {
    const transaction = await City.sequelize?.transaction();

    try {
      for (let i = 0; i < updates.length; i += batchSize) {
        const batch = updates.slice(i, i + batchSize);

        const updateQuery = `
          UPDATE cities AS c
          SET population = u.population,
              updated_at = NOW()
          FROM (VALUES ${batch.map((_, idx) => `(:name${idx}, :state${idx}, :population${idx})`).join(', ')}) AS u(name, state, population)
          WHERE c.name = u.name AND c.state = u.state;
        `;

        const replacements = batch.reduce((acc, { name, state, population }, idx) => {
          acc[`name${idx}`] = name;
          acc[`state${idx}`] = state;
          acc[`population${idx}`] = population;
          return acc;
        }, {} as Record<string, string | number>);

        await City.sequelize?.query(updateQuery, {
          type: QueryTypes.UPDATE,
          replacements,
          transaction,
        });
      }

      await transaction?.commit();
    } catch (error) {
      await transaction?.rollback();
      if (error instanceof Error) {
        throw new Error(`Error updating population: ${error.message}`);
      } else {
        throw new Error('Error updating population');
      }
    }
  }
}

export default new CityRepository();
