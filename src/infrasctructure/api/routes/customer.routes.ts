import express from "express";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import CreateCustomerUsecase from "../../../usecase/customer/create/create.customer";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer";
import CustomerPresenter from "../presenters/customer.presenter";
export const customerRouter = express.Router();

customerRouter.post("/", async (req, res) => {
  const customerRepository = new CustomerRepository();
  const usecase = new CreateCustomerUsecase(customerRepository);
  try {
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        country: req.body.address.country,
        zip: req.body.address.zip,
      },
    };

    const customer = await usecase.execute(customerDto);
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: JSON.stringify(error) });
  }
});

customerRouter.get("/", async (req, res) => {
  const customerRepository = new CustomerRepository();
  const usecase = new ListCustomerUseCase(customerRepository);
  const customers = await usecase.execute({
    limit: 100,
    page: 1,
  });

  res.format({
    "application/json": () => {
      res.status(200).json(customers);
    },
    "application/xml": () => {
      res.status(200).send(CustomerPresenter.toXML(customers));
    },
  });
});
