// models/Municipality.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

interface MunicipalityAttributes {
  id: number;
  name: string;
  state: string;
  population: number;
}

class Municipality extends Model<MunicipalityAttributes> implements MunicipalityAttributes {
  public id!: number;
  public name!: string;
  public state!: string;
  public population!: number;
}

Municipality.init(
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
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'municipalities',
  }
);

export default Municipality;
