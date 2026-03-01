// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class FlightCrewAssignment extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   FlightCrewAssignment.init({
//     id: DataTypes.UUID,
//     flight_id: DataTypes.UUID,
//     crew_member_id: DataTypes.UUID,
//     role_on_flight: DataTypes.STRING,
//     assigned_at: DataTypes.DATE,
//     assigned_by: DataTypes.UUID,
//     notes: DataTypes.TEXT
//   }, {
//     sequelize,
//     modelName: 'FlightCrewAssignment',
//   });
//   return FlightCrewAssignment;
// };
