import { Request, Response } from 'express';
import pollService from '../services/pollService';

class PollController {
  async uploadPollData(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({ message: 'File is required' });
        return;
      }

      const result = await pollService.processPollCsv(req.file.path);

      res.status(201).json({ message: 'Poll data processed successfully', result });
    } catch (error) {
      console.error('Error processing CSV:', error);
      res.status(500).json({ message: 'An error occurred while processing the CSV' });
    }
  }

  async getPollResults(_req: Request, res: Response): Promise<void> {
    try {
      const results = await pollService.calculateVoteIntentions();

      res.status(200).json({ results });
    } catch (error) {
      console.error('Error getting poll results:', error);
      res.status(500).json({ message: 'An error occurred while getting poll results' });
    }
  }
}

export default new PollController();
