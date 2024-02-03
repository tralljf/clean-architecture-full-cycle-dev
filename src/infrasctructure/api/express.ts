import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../customer/repository/sequelize/customer.model";
import { customerRouter } from "./routes/customer.routes";
import { productRoutes } from "./routes/product.routes";
import ProductModel from "../product/repository/sequelize/product.model";

export const app: Express = express();

app.use(express.json());
app.use("/customer", customerRouter);
app.use("/product", productRoutes);

export let sequelize: Sequelize;
async function setupDB() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    database: "memory",
    logging: false,
  });
  await sequelize.addModels([CustomerModel, ProductModel]);
  await sequelize.sync({ force: true });
}

setupDB();
