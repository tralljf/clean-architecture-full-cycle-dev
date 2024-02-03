export default class Address {
  private _street: string;
  private _city: string;
  private _zip: string;
  private _country: string;

  constructor(street: string, city: string, zip: string, country: string) {
    this._street = street;
    this._city = city;
    this._zip = zip;
    this._country = country;

    this._validate();
  }

  private _validate() {
    if (this._street == null || this._street == "") {
      throw new Error("Street is required");
    }
    if (this._city == null || this._city == "") {
      throw new Error("City is required");
    }
    if (this._zip == null || this._zip == "") {
      throw new Error("Zip is required");
    }
    if (this._country == null || this._country == "") {
      throw new Error("Country is required");
    }
  }

  toString() {
    return `${this._street}, ${this._city}, ${this._zip}, ${this._country}`;
  }

  get street() {
    return this._street;
  }

  get city() {
    return this._city;
  }

  get zip() {
    return this._zip;
  }

  get country() {
    return this._country;
  }
}
