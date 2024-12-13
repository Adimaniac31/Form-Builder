import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Form } from "./Form";

@Table({ tableName: "Users" })
export class User extends Model {
  @Column({
    type: DataType.UUID, // Ensure UUID type
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  username!: string;

  @HasMany(() => Form)
  forms!: Form[];
}

