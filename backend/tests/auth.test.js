const request = require("supertest");
const app = require("../server"); // Adjust the path as needed

describe("Auth API", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "testuser",
      email: "test@example.com",
      password: "password123",
    });

    console.log(res.body); // Debug the response body

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should login an existing user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });

    console.log(res.body); // Debug the response body

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
});
