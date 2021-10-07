import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'Anna', description: 'Unique name' })
  readonly name: string;
  @ApiProperty({ example: ['ADMIN'], description: 'Role' })
  readonly role: string;
}
