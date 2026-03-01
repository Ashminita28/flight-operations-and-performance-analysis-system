// // import { Role } from "../models/Role";
// // import { User } from "../models/User";
// // import { Permission } from "../models/Permission";
// // import { RolePermission } from "../models/RolePermission";
// // import { Flight } from "../models/Flight";
// // import { Aircraft } from "../models/Aircraft";
// // import { Airport } from "../models/Airport";
// // import { FlightPerformance } from "../models/FlightPerformance";
// // import { OperationalEvent } from "../models/OperationalEvent";
// // import { DelayCategory } from "../models/DelayCategory";
// // import { CrewMember } from "../models/CrewMember";
// // import { FlightCrewAssignment } from "../models/FlightCrewAssignment";
// // import { FlightNote } from "../models/FlightNote";
// // import { FlightStatusHistory } from "../models/FlightStatusHistory";

// // export const setupAssociations = () => {

// // Role.hasMany(User,{foreignKey:"role_id"});
// // User.belongsTo(Role,{foreignKey:"role_id"});

// // Role.belongsToMany(Permission,{
// // through:RolePermission,
// // foreignKey:"role_id"
// // });

// // Permission.belongsToMany(Role,{
// // through:RolePermission,
// // foreignKey:"permission_id"
// // });

// // Aircraft.hasMany(Flight,{foreignKey:"aircraft_id"});
// // Flight.belongsTo(Aircraft,{foreignKey:"aircraft_id"});

// // Airport.hasMany(Flight,{
// // foreignKey:"origin_airport",
// // as:"originFlights"
// // });

// // Airport.hasMany(Flight,{
// // foreignKey:"destination_airport",
// // as:"destinationFlights"
// // });

// // Flight.belongsTo(Airport,{
// // foreignKey:"origin_airport",
// // as:"origin"
// // });

// // Flight.belongsTo(Airport,{
// // foreignKey:"destination_airport",
// // as:"destination"
// // });

// // Flight.hasOne(FlightPerformance,{
// // foreignKey:"flight_id"
// // });

// // FlightPerformance.belongsTo(Flight,{
// // foreignKey:"flight_id"
// // });

// // Flight.hasMany(OperationalEvent,{
// // foreignKey:"flight_id"
// // });

// // OperationalEvent.belongsTo(Flight,{
// // foreignKey:"flight_id"
// // });

// // DelayCategory.hasMany(OperationalEvent,{
// // foreignKey:"delay_category_id"
// // });

// // OperationalEvent.belongsTo(DelayCategory,{
// // foreignKey:"delay_category_id"
// // });

// // Flight.hasMany(FlightCrewAssignment,{
// // foreignKey:"flight_id"
// // });

// // CrewMember.hasMany(FlightCrewAssignment,{
// // foreignKey:"crew_member_id"
// // });

// // Flight.hasMany(FlightNote,{
// // foreignKey:"flight_id"
// // });

// // Flight.hasMany(FlightStatusHistory,{
// // foreignKey:"flight_id"
// // });

// // };

// import { Aircraft } from "./aircraft";
// import { Flight } from "./flight";
// import { Airport } from "./airport";

// export const setupAssociations=()=>{
//     // const{
//     //     Aircraft,

//     // }=setupAssociations;
//     Aircraft.hasMany(Flight,{foreignKey:"aircraft_id"});
// Flight.belongsTo(Aircraft,{foreignKey:"aircraft_id"});

// Airport.hasMany(Flight,{
// foreignKey:"origin_airport",
// as:"originFlights"
// });

// Airport.hasMany(Flight,{
// foreignKey:"destination_airport",
// as:"destinationFlights"
// });

// Flight.belongsTo(Airport,{
// foreignKey:"origin_airport",
// as:"origin"
// });

// Flight.belongsTo(Airport,{
// foreignKey:"destination_airport",
// as:"destination"
// });

// }
