import {
  BelongsTo,
  HasMany,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import CustomerModel from "./customer.model";
import OrderItemModel from "./order_item.model";

@Table({
  tableName: "ordes",
  timestamps: false,
})
export default class OrderModel extends Model {
  @Column({ primaryKey: true })
  declare id: string;

  @ForeignKey(() => CustomerModel)
  @Column({
    allowNull: false,
  })
  declare customer_id: string;

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;

  @HasMany(() => OrderItemModel)
  declare items: OrderItemModel;

  @Column
  @Column({
    allowNull: false,
  })
  declare total: number;
}
