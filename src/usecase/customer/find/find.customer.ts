import CustomerRepositoryInterface from "../../../domain/customer/repository/custome-repository.interface";
import {
  InputFindCustomerDto,
  OutputFindCustomerDto,
} from "./find.customer.dto";

export default class FindCustomerUseCase {
  private customerRepoitory: CustomerRepositoryInterface;

  constructor(customerRepoitory: CustomerRepositoryInterface) {
    this.customerRepoitory = customerRepoitory;
  }

  async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
    const customer = await this.customerRepoitory.findById(input.id);
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
