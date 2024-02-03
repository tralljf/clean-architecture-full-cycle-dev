import OrderItem from "./order_item";

export default class Order {
  private _id: string;
  private _customer_id: string;
  private _items: OrderItem[];
  private _total: number;

  constructor(id: string, customer_id: string, items: OrderItem[]) {
    this._id = id;
    this._customer_id = customer_id;
    this._items = items;
    this._total = this.total();
  }

  get items(): OrderItem[] {
    return this._items;
  }

  get id(): string {
    return this._id;
  }

  get customer_id(): string {
    return this._customer_id;
  }

  changeItems(items: OrderItem[]): void {
    this._items = items;
    this._total = this.total();
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
  }
}
