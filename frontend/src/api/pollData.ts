import { PollData } from '../types/PollData';
import { api } from './api';

export const getPollData = async (): Promise<PollData[]> => {
  const response = await api.get<{ results: PollData[] }>('/poll');
  switch (response.status) {
    case 200:
      return response.data.results;
    default:
      throw new Error('Failed to fetch poll data');
  }
};
