import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

interface CandidateAttributes {
  id: number;
  name: string;
}

interface CandidateCreationAttributes extends Optional<CandidateAttributes, 'id'> {}

class Candidate extends Model<CandidateAttributes, CandidateCreationAttributes> implements CandidateAttributes {
  public id!: number;
  public name!: string;
}

Candidate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'candidates',
  }
);

export default Candidate;
