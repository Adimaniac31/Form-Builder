import { Table, Column, Model, ForeignKey, DataType, CreatedAt } from "sequelize-typescript";
import { Form } from "./Form";

@Table({ tableName: "Submissions" })
export class Submission extends Model {
  @ForeignKey(() => Form)
  @Column({ type: DataType.UUID, allowNull: false })
  formId!: string;

  @Column({ type: DataType.JSON, allowNull: false })
  submissionData!: Record<string, any>;

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt!: Date;
}
