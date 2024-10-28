import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database';

interface CityAttributes {
  id: number;
  name: string;
  state: string;
  population: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CityCreationAttributes extends Optional<CityAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class City extends Model<CityAttributes, CityCreationAttributes> implements CityAttributes {
  public id!: number;
  public name!: string;
  public state!: string;
  public population!: number;
  public createdAt?: Date;
  public updatedAt?: Date;
}

City.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_at',
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at',
    },
  },
  {
    sequelize,
    tableName: 'cities',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        unique: true,
        fields: ['name', 'state'],
        name: 'unique_name_state',
      },
    ],
  }
);

export default City;
