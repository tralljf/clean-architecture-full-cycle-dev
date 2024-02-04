import CustomerModel from "../../customer/repository/sequelize/customer.model";
import { sequelize, app } from "../express";
import request from "supertest";

describe("E2E test for Customer", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });
  afterAll(async () => {
    await sequelize.close();
  });
  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John Doe",
        address: {
          street: "1234 Main St",
          city: "New York",
          country: "USA",
          zip: "10001",
        },
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      name: "John Doe",
      address: {
        street: "1234 Main St",
        city: "New York",
        country: "USA",
        zip: "10001",
      },
    });
  });

  it("should return 500 if there is an error", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John Doe",
        address: {
          street: "1234 Main St",
          city: "New York",
          country: "USA",
        },
      });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: expect.any(String),
    });
  });

  it("should list all customers", async () => {
    await CustomerModel.truncate();
    await request(app)
      .post("/customer")
      .send({
        name: "John Doe",
        address: {
          street: "1234 Main St",
          city: "New York",
          country: "USA",
          zip: "10001",
        },
      });

    await request(app)
      .post("/customer")
      .send({
        name: "Jane ",
        address: {
          street: "1234 Main St2",
          city: "New York2",
          country: "USA2",
          zip: "10002",
        },
      });

    const response = await request(app).get("/customer");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      customers: [
        {
          id: expect.any(String),
          name: "John Doe",
          address: {
            street: "1234 Main St",
            city: "New York",
            country: "USA",
            zip: "10001",
          },
        },
        {
          id: expect.any(String),
          name: "Jane ",
          address: {
            street: "1234 Main St2",
            city: "New York2",
            country: "USA2",
            zip: "10002",
          },
        },
      ],
    });
  });

  it("should list all customers in XML format", async () => {
    await CustomerModel.truncate();
    await request(app)
      .post("/customer")
      .send({
        name: "John Doe",
        address: {
          street: "1234 Main St",
          city: "New York",
          country: "USA",
          zip: "10001",
        },
      });

    await request(app)
      .post("/customer")
      .send({
        name: "Jane ",
        address: {
          street: "1234 Main St2",
          city: "New York2",
          country: "USA2",
          zip: "10002",
        },
      });

    const response = await request(app)
      .get("/customer")
      .set("Accept", "application/xml");

    expect(response.status).toBe(200);
    expect(response.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
    expect(response.text).toContain(`<customers>`);
    expect(response.text).toContain(`<customer>`);
    expect(response.text).toContain(`<id>`);
    expect(response.text).toContain(`<name>John Doe</name>`);
    expect(response.text).toContain(`<name>Jane </name>`);
  });
});
