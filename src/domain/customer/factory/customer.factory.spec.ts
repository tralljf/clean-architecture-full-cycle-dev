import Customer from "../entity/customer";
import CustomerFactory from "./customer.factory";

describe("Customer Factory unit Test", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create("Customer A");
    expect(customer).toBeInstanceOf(Customer);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer A");
  });

  it("should create a customer with address", () => {
    const customer = CustomerFactory.createWithAddress(
      "Customer A",
      "Street A",
      "City A",
      "12345",
      "Country A"
    );
    expect(customer).toBeInstanceOf(Customer);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer A");
    expect(customer.address.street).toBe("Street A");
    expect(customer.address.city).toBe("City A");
    expect(customer.address.zip).toBe("12345");
    expect(customer.address.country).toBe("Country A");
  });
});
