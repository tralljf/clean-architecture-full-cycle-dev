import CustomerRepositoryInterface from "../../../domain/customer/repository/custome-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import {
  InputUpdateCustomerDto,
  OutputUpdateCustomerDto,
} from "./update.customer.dto";

export default class UpdateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;
  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(
    input: InputUpdateCustomerDto
  ): Promise<OutputUpdateCustomerDto> {
    const customer = await this.customerRepository.findById(input.id);
    const adress = new Address(
      input.address.street,
      input.address.city,
      input.address.zip,
      input.address.country
    );

    customer.changeName(input.name);
    customer.setAddress(adress);

    await this.customerRepository.update(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        zip: customer.address.zip,
        country: customer.address.country,
      },
    };
  }
}
