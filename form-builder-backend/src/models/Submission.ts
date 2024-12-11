import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import { Form } from "./Form";

@Table
export class Submission extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @ForeignKey(() => Form)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  formId!: string;

  @Column(DataType.JSON)
  data!: any;
}
