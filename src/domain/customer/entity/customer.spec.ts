import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer tests", () => {
  it("should create a new customer", () => {
    const customer = new Customer("1", "John Doe");
    expect(customer).toBeDefined();
  });

  it("should change name", () => {
    const customer = new Customer("1", "John Doe");
    customer.changeName("Jane Doe");
    expect(customer.name).toEqual("Jane Doe");
  });

  it("should validate invalid change name", () => {
    const customer = new Customer("1", "John Doe");
    expect(() => {
      customer.changeName("");
    }).toThrowError("Name is required");
  });

  it("should create a new customer with address", () => {
    const address = new Address("123 Main St", "Springfield", "12345", "USA");
    const customer = new Customer("1", "John Doe", address);
    expect(customer).toBeDefined();
    expect(customer.address).toBeDefined();
  });

  it("should trow an error when creating a new customer without name", () => {
    expect(() => {
      new Customer("1", "");
    }).toThrowError("Name is required");
  });

  it("should trow an error when creating a new customer without id", () => {
    expect(() => {
      new Customer("", "John Doe");
    }).toThrowError("Id is required");
  });

  it("should activate a customer", () => {
    const customer = new Customer("1", "John Doe");
    expect(customer.isActive()).toBeFalsy();

    const address = new Address("123 Main St", "Springfield", "12345", "USA");
    customer.setAddress(address);
    customer.activate();
    expect(customer.isActive()).toBeTruthy();
  });

  it("should validate active customer without address", () => {
    const customer = new Customer("1", "John Doe");
    expect(() => {
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  });

  it("should deactivated a customer", () => {
    const customer = new Customer("1", "John Doe");
    expect(customer.isActive()).toBeFalsy();

    const address = new Address("123 Main St", "Springfield", "12345", "USA");
    customer.setAddress(address);
    customer.activate();
    expect(customer.isActive()).toBeTruthy();

    customer.deactivate();
    expect(customer.isActive()).toBeFalsy();
  });

  it("should validate when name and id are empty", () => {
    expect(() => {
      new Customer("", "");
    }).toThrowError("customer: Id is required,customer: Name is required");
  });
});
