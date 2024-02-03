export default class Product {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._validate();
  }

  private _validate() {
    if (this._id === "") {
      throw new Error("Id is required");
    }

    if (this._name.length === 0) {
      throw new Error("Name is required");
    }

    if (this._price < 0) {
      throw new Error("Price must be greater than 0");
    }
  }

  getName() {
    return this._name;
  }

  setName(name: string) {
    this._name = name;
    this._validate();
  }

  getPrice() {
    return this._price;
  }

  setPrice(price: number) {
    this._price = price;
    this._validate();
  }

  get price(): number {
    return this._price;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }
}
