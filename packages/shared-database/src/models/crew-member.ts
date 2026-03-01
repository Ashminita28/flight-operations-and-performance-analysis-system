// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class CrewMember extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   CrewMember.init({
//     id: DataTypes.UUID,
//     employee_id: DataTypes.STRING,
//     full_name: DataTypes.STRING,
//     role: DataTypes.STRING,
//     license_number: DataTypes.STRING,
//     license_expiry: DataTypes.DATE,
//     base_airport: DataTypes.STRING,
//     is_active: DataTypes.BOOLEAN,
//     created_at: DataTypes.DATE
//   }, {
//     sequelize,
//     modelName: 'CrewMember',
//   });
//   return CrewMember;
// };
