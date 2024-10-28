import CityRepository from '../repository/CityRepository';

export async function fetchPopulations(): Promise<{ name: string; state: string; population: number }[]> {
  try {
    const cities = await CityRepository.findAll();
    const updates = cities.map((city) => {
      const population = city.population + Math.round(city.population * (Math.random() * 0.01 - 0.005));
      return {
        name: city.name,
        state: city.state,
        population,
      };
    });

    return updates;
  } catch (error: any) {
    throw new Error(`Error fetching populations: ${error.message}`);
  }
}
