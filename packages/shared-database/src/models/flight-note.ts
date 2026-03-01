// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class FlightNote extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   FlightNote.init({
//     id: DataTypes.UUID,
//     flight_id: DataTypes.UUID,
//     note_type: DataTypes.STRING,
//     content: DataTypes.TEXT,
//     is_internal: DataTypes.BOOLEAN,
//     created_by: DataTypes.UUID,
//     created_at: DataTypes.DATE
//   }, {
//     sequelize,
//     modelName: 'FlightNote',
//   });
//   return FlightNote;
// };
