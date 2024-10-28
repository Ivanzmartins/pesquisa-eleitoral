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

      await Promise.all(
        mappedResults.map(async (row) => {
          if (row.candidateName === '#N/D') {
            return;
          }

          await PollResultRepository.create({
            externalId: row.externalId,
            pollDate: new Date(row.pollDate),
            candidateName: row.candidateName,
            cityName: row.cityName,
            state: row.state,
          });
        })
      );

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
      pollDate: row.DATA_PESQUISA,
      candidateName: row.INTENCAO_DE_VOTO,
      cityName: row.MUNICIPIO,
      state: row.ESTADO,
    }));
  }
}

export default new PollService();
