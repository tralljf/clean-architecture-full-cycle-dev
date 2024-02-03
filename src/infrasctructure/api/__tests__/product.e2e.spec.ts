import ProductModel from "../../product/repository/sequelize/product.model";
import { sequelize, app } from "../express";
import request from "supertest";

describe("E2E test for Product", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });
  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
      price: 100,
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      name: "Product 1",
      price: 100,
    });
  });

  it("should return 500 if there is an error", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: expect.any(String),
    });
  });

  it("should list all products", async () => {
    await ProductModel.truncate();
    await request(app).post("/product").send({
      name: "Product 1",
      price: 100,
    });

    await request(app).post("/product").send({
      name: "Product 2",
      price: 200,
    });

    const response = await request(app).get("/product/list");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: expect.any(String),
        name: "Product 1",
        price: 100,
      },
      {
        id: expect.any(String),
        name: "Product 2",
        price: 200,
      },
    ]);
  });
});
