import {
  InputListCustomerDto,
  OutputListCustomerDto,
} from "./list.customer.dto";
import CustomerRepositoryInterface from "../../../domain/customer/repository/custome-repository.interface";

export default class ListCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;
  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto[]> {
    const customers = await this.customerRepository.findAll();

    return customers.map((customer) => ({
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        zip: customer.address.zip,
        country: customer.address.country,
      },
    }));
  }
}
