import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

interface PollAttributes {
  id: number;
  date: Date;
}

interface PollCreationAttributes extends Optional<PollAttributes, 'id'> {}

class Poll extends Model<PollAttributes, PollCreationAttributes> implements PollAttributes {
  public id!: number;
  public date!: Date;
}

Poll.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
