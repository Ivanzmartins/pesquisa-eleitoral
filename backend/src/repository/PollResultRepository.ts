import { QueryTypes } from 'sequelize';
import { PollResult } from '../db/models';
import { sequelize } from '../db/database';

class PollResultRepository {
  async findById(id: number) {
    return await PollResult.findByPk(id);
  }

  async create(pollResultData: { externalId: string; pollDate: Date; candidateName: string; cityName: string; state: string }) {
    return await PollResult.create(pollResultData);
  }

  async findAll() {
    return await PollResult.findAll();
  }

  async calculateVoteIntentions() {
    try {
      const results = await sequelize.query(
        `
              WITH city_groups AS (
  SELECT
    c.id,
    c.name AS city_name,
    c.state,
    c.population,
    CASE
      WHEN c.population <= 20000 THEN 'G1'
      WHEN c.population > 20000 AND c.population <= 100000 THEN 'G2'
      WHEN c.population > 100000 AND c.population <= 1000000 THEN 'G3'
      ELSE 'G4'
    END AS city_group
  FROM
    cities c
),
weighted_votes AS (
  SELECT
    pr.external_id,
    pr.poll_date,
    pr.candidate_name,
    cg.city_group,
    SUM(cg.population) AS candidate_population
  FROM
    poll_results pr
  JOIN
    city_groups cg ON pr.city_name = cg.city_name AND pr.state = cg.state
  GROUP BY
    pr.external_id, pr.poll_date, pr.candidate_name, cg.city_group
),
total_population AS (
  SELECT
    pr.external_id,
    pr.poll_date,
    cg.city_group,
    SUM(cg.population) AS total_population
  FROM
    poll_results pr
  JOIN
    city_groups cg ON pr.city_name = cg.city_name AND pr.state = cg.state
  GROUP BY
    pr.external_id, pr.poll_date, cg.city_group
)
SELECT
  w.external_id,
  w.poll_date,
  w.candidate_name,
  w.city_group,
  (w.candidate_population::decimal / t.total_population) * 100 AS vote_percentage
FROM
  weighted_votes w
JOIN
  total_population t ON w.external_id = t.external_id
                      AND w.poll_date = t.poll_date
                      AND w.city_group = t.city_group
        `,
        {
          type: QueryTypes.SELECT,
        }
      );

      return results;
    } catch (error) {
      console.error(error);
      throw new Error('Error calculating vote intentions');
    }
  }
}

export default new PollResultRepository();
