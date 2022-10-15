'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fixture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Fixture.init({
    homeTeamId: DataTypes.INTEGER,
    awayTeamId: DataTypes.INTEGER,
    date: DataTypes.STRING,
    time: DataTypes.STRING,
    referee: DataTypes.STRING,
    matchStatus: DataTypes.STRING, // 'upcoming', 'live', 'finished'
    venue: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Fixture',
  });
  return Fixture;
};