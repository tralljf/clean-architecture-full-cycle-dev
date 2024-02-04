import {
  InputListCustomerDto,
  OutputListCustomerDto,
} from "./list.customer.dto";
import CustomerRepositoryInterface from "../../../domain/customer/repository/custome-repository.interface";
import Customer from "../../../domain/customer/entity/customer";

export default class ListCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;
  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll();

    return OutputMapper.toOutput(customers);
  }
}

class OutputMapper {
  static toOutput(customer: Customer[]): OutputListCustomerDto {
    return {
      customers: customer.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.address.street,
          country: customer.address.country,
          zip: customer.address.zip,
          city: customer.address.city,
        },
      })),
    };
  }
}
