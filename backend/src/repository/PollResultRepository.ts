import PollResult from '../db/models/PollResultModel';

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
}

export default new PollResultRepository();
