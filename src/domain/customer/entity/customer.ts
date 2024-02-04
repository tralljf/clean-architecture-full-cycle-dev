import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import Address from "../value-object/address";

export default class Customer extends Entity {
  private _name: string;
  private _address: Address | undefined;
  private _active: boolean = false;
  private _rewards: number = 0;

  constructor(
    id: string,
    name: string,
    address: Address | undefined = undefined,
    active: boolean = false,
    rewards: number = 0
  ) {
    super(id);
    this._name = name;
    this._address = address || undefined;
    this._active = active;
    this._rewards = rewards;
    this.validate();
  }

  get name() {
    return this._name;
  }

  get rewards() {
    return this._rewards;
  }

  get address() {
    return this._address;
  }

  private validate() {
    if (this._id === "") {
      this.notification.addError({
        message: "Id is required",
        context: "customer",
      });
    }

    if (this._name.length === 0) {
      this.notification.addError({
        message: "Name is required",
        context: "customer",
      });
    }

    if (this.notification.hasError()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if (this._address == null) {
      this.notification.addError({
        message: "Address is mandatory to activate a customer",
        context: "customer",
      });
      if (this.notification.hasError()) {
        throw new NotificationError(this.notification.getErrors());
      }
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  setAddress(address: Address) {
    this._address = address;
  }

  isActive() {
    return this._active;
  }

  addRewardsPoints(rewards: number) {
    this._rewards += rewards;
  }
}
