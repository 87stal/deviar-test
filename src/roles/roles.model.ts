import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserCreationAttr {
  role: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, UserCreationAttr> {
  @ApiProperty({ example: '1', description: 'Unique indentificator' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'User`s role' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  role: string;
}
