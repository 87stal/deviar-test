import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-role.model';

interface UserCreationAttr {
  name: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttr> {
  @ApiProperty({ example: '1', description: 'Unique indentificator' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Anna', description: 'Unique name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
