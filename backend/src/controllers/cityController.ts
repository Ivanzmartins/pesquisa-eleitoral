import { Request, Response, NextFunction } from 'express';

import cityService from '../services/cityService';

class CityController {
  async updateCities(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await cityService.updatePopulations();

      res.status(200).json({ message: 'City populations updated', result });
    } catch (error) {
      console.error('Error updating city populations:', error);
      res.status(500).json({ message: 'An error occurred while updating city populations' });
    }
  }
}

export default new CityController();
