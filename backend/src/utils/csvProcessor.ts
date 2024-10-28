import fs from 'fs';
import csv from 'csv-parser';

export interface PollCsvRow {
  ID_PESQUISA: string;
  DATA_PESQUISA: string;
  MUNICIPIO: string;
  ESTADO: string;
  INTENCAO_DE_VOTO: string;
}

export async function processCsvFile(filePath: string): Promise<PollCsvRow[]> {
  return new Promise((resolve, reject) => {
    const results: PollCsvRow[] = [];

    fs.createReadStream(filePath, { encoding: 'latin1' })
      .pipe(csv({ separator: ';' }))
      .on('data', (row) => {
        const normalizedRow = Object.fromEntries(
          Object.entries(row).map(([key, value]) => [
            key
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/ /g, '_')
              .toUpperCase(),
            value,
          ])
        );

        results.push(normalizedRow as unknown as PollCsvRow);
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}
