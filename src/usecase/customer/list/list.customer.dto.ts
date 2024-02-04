export interface InputListCustomerDto {
  page: number;
  limit: number;
}

type Customer = {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    zip: string;
    country: string;
  };
};

export interface OutputListCustomerDto {
  customers: Customer[];
}
