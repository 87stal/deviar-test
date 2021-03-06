import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(dto: CreateRoleDto) {
    const role = await this.roleRepository.create(dto);
    return role;
  }

  async getRoleByValue(role: string) {
    const selectedRole = await this.roleRepository.findOne({ where: { role } });
    return selectedRole;
  }

  async getAllRoles() {
    const selectedRole = await this.roleRepository.findAll();
    return selectedRole;
  }
}
