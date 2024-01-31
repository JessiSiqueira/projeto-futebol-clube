import { Model, QueryInterface, DataTypes } from 'sequelize';
import { TeamInterface } from '../../Interfaces/TeamInterface';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<TeamInterface>>('teams', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      teamName: { 
        type: DataTypes.STRING, 
        allowNull: false,
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('teams');
  },
};