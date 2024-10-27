import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

interface PollResultAttributes {
  id: number;
  candidateId: number;
  municipalityId: number;
  pollId: number;
  votePercentage: number;
}

interface PollResultCreationAttributes extends Optional<PollResultAttributes, 'id'> {}

class PollResult extends Model<PollResultAttributes, PollResultCreationAttributes> implements PollResultAttributes {
  public id!: number;
  public candidateId!: number;
  public municipalityId!: number;
  public pollId!: number;
  public votePercentage!: number;
}

PollResult.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    candidateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'candidates',
        key: 'id',
      },
    },
    municipalityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'municipalities',
        key: 'id',
      },
    },
    pollId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'polls',
        key: 'id',
      },
    },
    votePercentage: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'poll_results',
  }
);

export default PollResult;
