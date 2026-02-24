// import Crew from "../models/crew";
// import Flight from "../models/flight";

// export const getAircraft=async()=>{

// }

// // create flight
// export const createFlightService = async (
// 	aircraft_id: string,
// 	route_id: string,
// 	departure_time: string,
// ) => {
// 	const aircraft = await Aircraft.findByPk(aircraft_id);
// 	if (!aircraft) {
// 		throw new Error("Aircraft not found");
// 	}
// 	if (aircraft.maintenance_status === "Under Maintenance") {
// 		throw new Error("Aircraft is under maintenance");
// 	}
// 	const crew=await Crew.findByPk(crew_id);
// 	if(!crew){
// 		throw new Error("Crew not available");
// 	}

// 	const existingFlight = await Flight.findOne({
// 		where: { aircraft_id, departure_time },
// 	});
// 	if (existingFlight) {
// 		throw new Error("Aircraft already assigned to another flight at this time");
// 	}

// 	return await Flight.create(data);
// };

// // update flight
// export const updateFlighService = async (id: string, data: any) => {
// 	const flight = await Flight.findByPk(id);
// 	if (!flight) {
// 		throw new Error("Flight not found");
// 	}
// 	await flight.update(data);
// 	return flight;
// };

// // get all flights
// export const getAllFlightsService = async () => {
// 	return await Flight.findAll({
// 		include: [{ model: Aircraft }, { model: Route }],
// 	});
// };

// // get flight by ID
// export const getFlightByIdService = async (id: string) => {
// 	const flight = await Flight.findByPk(id, { include: [Aircraft] });
// };

// // update flight status
// export const updateFlightStatus = async (id: string, status: string) => {
// 	const flight = await Flight.findByPk(id);
// 	if (!flight) {
// 		throw new Error("Flight not found");
// 		// await flight.update({ status });
// 		// return flight;
// 	}
// };
