// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Analytics extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Analytics.init({
//     id: DataTypes.UUID,
//     job_type: DataTypes.STRING,
//     status: DataTypes.STRING,
//     parameters: DataTypes.JSON,
//     result_summary: DataTypes.JSON,
//     error_message: DataTypes.TEXT,
//     started_at: DataTypes.DATE,
//     completed_at: DataTypes.DATE,
//     triggered_by: DataTypes.UUID,
//     created_at: DataTypes.DATE
//   }, {
//     sequelize,
//     modelName: 'Analytics',
//   });
//   return Analytics;
// };
