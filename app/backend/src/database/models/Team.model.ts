import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class ModelTeam extends Model<InferAttributes<ModelTeam>,
InferCreationAttributes<ModelTeam>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

ModelTeam.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING, // Replace with the actual data type of teamName
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
});

export default ModelTeam;
