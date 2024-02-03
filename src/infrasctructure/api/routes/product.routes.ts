import express from "express";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import CreateProuctRepository from "../../../usecase/product/create/create.product";
import ListCustomerUseCase from "../../../usecase/product/list/list.product";
export const productRoutes = express.Router();

productRoutes.post("/", async (req, res) => {
  const productRepository = new ProductRepository();
  const usecase = new CreateProuctRepository(productRepository);
  try {
    const dto = {
      name: req.body.name,
      price: req.body.price,
    };

    const customer = await usecase.execute(dto);
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: JSON.stringify(error) });
  }
});

productRoutes.get("/list", async (req, res) => {
  const productRepository = new ProductRepository();
  const usecase = new ListCustomerUseCase(productRepository);
  const customers = await usecase.execute({
    limit: 100,
    page: 1,
  });
  res.status(200).json(customers);
});
