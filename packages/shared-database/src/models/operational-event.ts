// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class OperationalEvent extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   OperationalEvent.init({
//     id: DataTypes.UUID,
//     flight_id: DataTypes.UUID,
//     event_type: DataTypes.STRING,
//     delay_category_id: DataTypes.UUID,
//     delay_minutes: DataTypes.INTEGER,
//     description: DataTypes.TEXT,
//     event_time: DataTypes.DATE,
//     resolved_at: DataTypes.DATE,
//     severity: DataTypes.STRING,
//     reported_by: DataTypes.UUID,
//     created_at: DataTypes.DATE
//   }, {
//     sequelize,
//     modelName: 'OperationalEvent',
//   });
//   return OperationalEvent;
// };
