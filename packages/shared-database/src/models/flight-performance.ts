// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class FlightPerformance extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   FlightPerformance.init({
//     id: DataTypes.UUID,
//     flight_id: DataTypes.UUID,
//     fuel_planned_kg: DataTypes.DECIMAL,
//     fuel_uplifted_kg: DataTypes.DECIMAL,
//     fuel_used_kg: DataTypes.DECIMAL,
//     fuel_remaining_kg: DataTypes.DECIMAL,
//     fuel_efficiency_kg_per_km: DataTypes.DECIMAL,
//     block_time_minutes: DataTypes.INTEGER,
//     flight_time_minutes: DataTypes.INTEGER,
//     distance_km: DataTypes.DECIMAL,
//     passengers_count: DataTypes.INTEGER,
//     cargo_weight_kg: DataTypes.DECIMAL,
//     payload_kg: DataTypes.DECIMAL,
//     load_factor_pct: DataTypes.DECIMAL,
//     cruise_altitude_ft: DataTypes.INTEGER,
//     average_speed_kmh: DataTypes.DECIMAL,
//     landing_weight_kg: DataTypes.DECIMAL,
//     takeoff_weight_kg: DataTypes.DECIMAL,
//     co2_emissions_kg: DataTypes.DECIMAL,
//     entered_by: DataTypes.UUID,
//     created_at: DataTypes.DATE,
//     updated_at: DataTypes.DATE
//   }, {
//     sequelize,
//     modelName: 'FlightPerformance',
//   });
//   return FlightPerformance;
// };
