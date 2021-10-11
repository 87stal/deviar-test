import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtUserGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      const userToChange = req.params.userId;

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'User is not logged in',
        });
      }

      const user = this.jwtService.verify(token);

      return user.id == userToChange;
    } catch (e) {
      throw new UnauthorizedException({
        message: 'User is not logged in',
      });
    }
  }
}
