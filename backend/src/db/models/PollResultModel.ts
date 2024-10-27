import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';
import Candidate from './CandidateModel';
import Municipality from './MunicipalityModel';
import Poll from './PollModel';

interface PollResultAttributes {
  id: number;
  pollId: number;
  municipalityId: number;
  candidateId: number;
}

interface PollResultCreationAttributes extends Optional<PollResultAttributes, 'id'> {}

class PollResult extends Model<PollResultAttributes, PollResultCreationAttributes> implements PollResultAttributes {
  public id!: number;
  public pollId!: number;
  public municipalityId!: number;
  public candidateId!: number;
}

PollResult.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pollId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Poll,
        key: 'id',
      },
    },
    municipalityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Municipality,
        key: 'id',
      },
    },
    candidateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Candidate,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'poll_results',
  }
);

PollResult.belongsTo(Candidate, { foreignKey: 'candidateId' });
PollResult.belongsTo(Municipality, { foreignKey: 'municipalityId' });
PollResult.belongsTo(Poll, { foreignKey: 'pollId' });

export default PollResult;
