import fs from 'fs';
import { processCsvFile, PollCsvRow } from '../utils/csvProcessor';
import PollResultRepository from '../repository/PollResultRepository';

interface MappedPollResult {
  externalId: string;
  pollDate: string;
  candidateName: string;
  cityName: string;
  state: string;
}

class PollService {
  async processPollCsv(filePath: string) {
    try {
      const csvData = await processCsvFile(filePath);
      const mappedResults = this.mapCsvRowsToPoll(csvData);

      console.time('Processing poll results');

      const results = await Promise.allSettled(
        mappedResults.map(async (row, index) => {
          if (row.candidateName === '#N/D') {
            return;
          }

          try {
            const pollDate = new Date(row.pollDate);
            if (isNaN(pollDate.getTime())) {
              throw new Error(`Invalid pollDate "${row.pollDate}" in row index ${index}`);
            }

            await PollResultRepository.create({
              externalId: row.externalId,
              pollDate,
              candidateName: row.candidateName,
              cityName: row.cityName,
              state: row.state,
            });
          } catch (error: any) {
            console.error(`Error processing row index ${index}: ${error.message}`);
            // Optionally, collect errors to handle later
            // throw error; // Uncomment to stop processing on error
          }
        })
      );

      // Optionally, handle all errors after processing
      const rejectedResults = results.filter((result) => result.status === 'rejected');
      if (rejectedResults.length > 0) {
        console.error(`There were ${rejectedResults.length} errors during processing.`);
        // Handle or log the errors as needed
      }

      console.timeEnd('Processing poll results');
    } catch (error: any) {
      console.error(`Error processing CSV: ${error.message}`);
      throw new Error(`Error processing CSV: ${error.message}`);
    } finally {
      fs.unlinkSync(filePath);
    }
  }

  private mapCsvRowsToPoll(rows: PollCsvRow[]): MappedPollResult[] {
    return rows.map((row) => ({
      externalId: row.ID_PESQUISA,
      pollDate: this.convertDateFormat(row.DATA_PESQUISA),
      candidateName: row.INTENCAO_DE_VOTO,
      cityName: row.MUNICIPIO,
      state: row.ESTADO,
    }));
  }

  private convertDateFormat(date: string): string {
    const [day, month, year] = date.split('/');
    return `${month}/${day}/${year}`;
  }

  async calculateVoteIntentions() {
    return PollResultRepository.calculateVoteIntentions();
  }
}

export default new PollService();
