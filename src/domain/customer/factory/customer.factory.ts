import Customer from "../entity/customer";
import { v4 as uuidv4 } from "uuid";
import Address from "../value-object/address";

export default class CustomerFactory {
  static create(name: string): Customer {
    return new Customer(uuidv4(), name);
  }

  static createWithAddress(
    name: string,
    street: string,
    city: string,
    zip: string,
    country: string
  ): Customer {
    const address = new Address(street, city, zip, country);
    return new Customer(uuidv4(), name, address);
  }
}
