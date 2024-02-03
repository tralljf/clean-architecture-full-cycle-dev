export interface InputListCustomerDto {
  page: number;
  limit: number;
}

export interface OutputListCustomerDto {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    zip: string;
    country: string;
  };
}
