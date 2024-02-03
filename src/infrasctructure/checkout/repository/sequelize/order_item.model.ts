import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderModel from "./order.model";

@Table({
  tableName: "order_items",
  timestamps: false,
})
export default class OrderItemModel extends Model {
  [x: string]: any;
  @Column({ primaryKey: true })
  declare id: string;

  @ForeignKey(() => ProductModel)
  @Column({
    allowNull: false,
  })
  declare product_id: string;

  @BelongsTo(() => ProductModel)
  declare product: ProductModel;

  @ForeignKey(() => OrderModel)
  @Column({
    allowNull: false,
  })
  declare order_id: string;

  @BelongsTo(() => OrderModel)
  declare order: OrderModel;

  @Column({
    allowNull: false,
  })
  declare price: number;

  @Column({
    allowNull: false,
  })
  declare quantity: number;

  @Column({
    allowNull: false,
  })
  declare name: string;
}