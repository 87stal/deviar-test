import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.rolesService.getRoleByValue('ADMIN');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByName(name) {
    const user = await this.userRepository.findOne({
      where: { name },
      include: { all: true },
    });
    return user;
  }

  async userUpdate(userId, dto: UpdateUserDto) {
    const updateUser = await this.userRepository.update(dto, {
      where: { id: userId },
    });
    return updateUser;
  }
}
