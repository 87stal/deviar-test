import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByName(userDto.name);
    if (candidate) {
      throw new HttpException(
        'User with same name already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userService.createUser({
      ...userDto,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { name: user.name, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByName(userDto.name);
    if (user) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Wrong name' });
  }
}
