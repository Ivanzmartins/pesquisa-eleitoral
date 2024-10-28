// db/models/PollResultModel.ts

import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

interface PollResultAttributes {
  id: number;
  externalId: string;
  pollDate: Date;
  candidateName: string;
  cityName: string;
  state: string;
}

interface PollResultCreationAttributes extends Optional<PollResultAttributes, 'id'> {}

class PollResult extends Model<PollResultAttributes, PollResultCreationAttributes> implements PollResultAttributes {
  public id!: number;
  public externalId!: string;
  public pollDate!: Date;
  public candidateName!: string;
  public cityName!: string;
  public state!: string;
}

PollResult.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    externalId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'external_id',
    },
    pollDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'poll_date',
    },
    candidateName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'candidate_name',
    },
    cityName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'city_name',
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'poll_results',
    timestamps: false,
  }
);

export default PollResult;
