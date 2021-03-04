import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IUser, Role } from "@vrees/authentication";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles: Role[] = context["metadata"]
      ? context["metadata"].roles
      : this.reflector.get<string[]>("roles", context.getHandler());
    const user: IUser | null = context.switchToHttp().getRequest().user;

    if (!roles) {
      return true;
    } else if (user === null) {
      throw new HttpException(
        "Unauthorized entry detected",
        HttpStatus.UNAUTHORIZED,
      );
    }

    return roles.indexOf(user.role) !== -1 || roles.length === 0;
  }
}
