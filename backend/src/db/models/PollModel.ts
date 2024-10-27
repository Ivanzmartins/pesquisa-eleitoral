import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

interface PollAttributes {
  id: number;
  date: Date;
}

class Poll extends Model<PollAttributes> implements PollAttributes {
  public id!: number;
  public date!: Date;
}

Poll.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'polls',
  }
);

export default Poll;
