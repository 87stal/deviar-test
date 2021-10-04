import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Anna', description: 'Unique name' })
  readonly name: string;
}
