import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "customers",
  timestamps: false,
})
export default class CustomerModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({
    allowNull: false,
  })
  name: string;

  @Column({
    allowNull: false,
  })
  street: string;

  @Column({
    allowNull: false,
  })
  city: string;

  @Column({
    allowNull: false,
  })
  zip: string;

  @Column({
    allowNull: false,
  })
  country: string;

  @Column({
    allowNull: false,
  })
  active: boolean;

  @Column({
    allowNull: false,
  })
  rewards: number;
}
