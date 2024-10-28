// utils/transformData.ts
import { PollData } from '../types/PollData';

export const transformData = (data: PollData[]) => {
  const transformedData: { [key: string]: any } = {};

  data.forEach((item) => {
    const date = item.poll_date.slice(5, 10);
    const candidate = item.candidate_name;
    const votePercentage = parseFloat(item.vote_percentage);

    if (!transformedData[date]) {
      transformedData[date] = { date };
    }

    transformedData[date][candidate] = votePercentage;
  });

  return Object.values(transformedData);
};
