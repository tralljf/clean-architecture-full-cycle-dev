import Address from "./address";

export default class Customer {
  private _id: string;
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
    this._id = id;
    this._name = name;
    this._address = address || undefined;
    this._active = active;
    this._rewards = rewards;
    this.validate();
  }

  get id() {
    return this._id;
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
      throw new Error("Id is required");
    }

    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if (this._address == null) {
      throw new Error("Address is mandatory to activate a customer");
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
