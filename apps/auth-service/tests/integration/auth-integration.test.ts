// import request from "supertest";
// import { describe, it, expect, beforeAll } from "vitest";
// import app from "../../src/app";
// import Role from "../../src/models/role";
// import sequelize from "@repo/shared-databse";
// import constants from "../../src/utils/constants";

// describe("Auth Integration", () => {
//     beforeAll(async () => {
//     await sequelize.sync({ force: true });

//     await Role.create({
//       name: constants.ROLE_OPERATIONS,
//     });
//   });

//   it("registers user", async () => {
//     const res = await request(app)
//       .post("/api/auth/register")
//       .send({
//         name: "Integration",
//         email: "int@test.com",
//         phone: "999",
//         password: "Pass@123",
//       });

//     expect(res.status).toBe(200);
//     expect(res.body.ok).toBe(true);
//     console.log("rtut:",res.body);
//   });

//   it("fails login with wrong password", async () => {
//     const res = await request(app)
//       .post("/api/auth/login")
//       .send({
//         email: "int@test.com",
//         password: "wrong",
//       });

//     expect(res.status).toBe(500);
//   });
// });
