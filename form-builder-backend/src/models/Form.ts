import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./User";

@Table({ tableName: "Forms" })
export class Form extends Model {
  @Column({
    type: DataType.UUID, // Ensure UUID type
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.TEXT)
  description!: string;

  @Column(DataType.JSON)
  fields!: any;

  @Column(DataType.STRING)
  shareableLink!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID }) // Match the type with `User.id`
  userId!: string;

  @BelongsTo(() => User)
  user!: User;
}
