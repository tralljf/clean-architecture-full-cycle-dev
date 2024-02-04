import Notification from "../notification/notification";

export default abstract class Entity {
  protected _id: string;
  notification: Notification;

  constructor(id: string) {
    this._id = id;
    this.notification = new Notification();
  }

  get id() {
    return this._id;
  }
}
