import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import ProductValidatorFactory from "../factory/product.validator.factory";
import ProductInterface from "./product.interface";

export default class Product extends Entity implements ProductInterface {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super(id);
    this._name = name;
    this._price = price;
    this._validate();
  }

  private _validate() {
    ProductValidatorFactory.create().validate(this);

    if (this.notification.hasError()) {
      throw new NotificationError(this.notification.getErrors());
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
