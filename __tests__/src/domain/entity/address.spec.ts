import Address from "../../../../src/domain/entity/address";

describe("Address tests", () => {
  it("should create a new address", () => {
    const address = new Address("123 Main St", "Springfield", "12345", "USA");
    expect(address).toBeDefined();
  });

  it("should throw an error when creating a new address without street", () => {
    expect(() => {
      new Address("", "Springfield", "12345", "USA");
    }).toThrowError("Street is required");
  });

  it("should throw an error when creating a new address without city", () => {
    expect(() => {
      new Address("123 Main St", "", "12345", "USA");
    }).toThrowError("City is required");
  });

  it("should throw an error when creating a new address without zip", () => {
    expect(() => {
      new Address("123 Main St", "Springfield", "", "USA");
    }).toThrowError("Zip is required");
  });

  it("should throw an error when creating a new address without country", () => {
    expect(() => {
      new Address("123 Main St", "Springfield", "12345", "");
    }).toThrowError("Country is required");
  });

  it("should return the address as a string", () => {
    const address = new Address("123 Main St", "Springfield", "12345", "USA");
    expect(address.toString()).toEqual("123 Main St, Springfield, 12345, USA");
  });

  it("should return the address as a string", () => {
    const address = new Address("123 Main St", "Springfield", "12345", "USA");
    expect(address.toString()).toEqual("123 Main St, Springfield, 12345, USA");
  });
});
