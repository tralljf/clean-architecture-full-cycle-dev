import CustomerModel from "./customer.model";
import Address from "../../../../domain/customer/value-object/address";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/custome-repository.interface";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      active: entity.isActive(),
      rewards: entity.rewards,
      street: entity.address.street,
      city: entity.address.city,
      zip: entity.address.zip,
      country: entity.address.country,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        active: entity.isActive(),
        rewards: entity.rewards,
        street: entity.address.street,
        city: entity.address.city,
        zip: entity.address.zip,
        country: entity.address.country,
      },
      { where: { id: entity.id } }
    );
  }

  async findById(id: string): Promise<Customer> {
    const customer = await CustomerModel.findOne({ where: { id } });
    if (customer == null) {
      throw new Error("Customer not found");
    }

    const address = new Address(
      customer.street,
      customer.city,
      customer.zip,
      customer.country
    );

    return new Customer(customer.id, customer.name, address);
  }

  async findAll(): Promise<Customer[]> {
    const customers = await CustomerModel.findAll();
    return customers.map(
      (customer) =>
        new Customer(
          customer.id,
          customer.name,
          new Address(
            customer.street,
            customer.city,
            customer.zip,
            customer.country
          ),
          customer.active
        )
    );
  }
}
