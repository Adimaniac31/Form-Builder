import { Table, Column, Model, PrimaryKey, DataType } from 'sequelize-typescript';

@Table
export class Form extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
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
}
