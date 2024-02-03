export interface InputCreateCustomerDto {
  name: string;
  address: {
    street: string;
    city: string;
    zip: string;
    country: string;
  };
}

export interface OutputCreateCustomerDto {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    zip: string;
    country: string;
  };
}
