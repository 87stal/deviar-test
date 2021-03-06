import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/users.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Create new role' })
  @ApiResponse({ status: 200, type: [Role] })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto);
  }

  @ApiOperation({ summary: 'Get role by value' })
  @ApiResponse({ status: 200, type: [Role] })
  @UseGuards(JwtAuthGuard)
  @Get('/:role')
  getByValue(@Param('role') role: string) {
    return this.rolesService.getRoleByValue(role);
  }

  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: 200, type: [Role] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.rolesService.getAllRoles();
  }
}
