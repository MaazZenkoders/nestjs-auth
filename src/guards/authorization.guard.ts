import { Injectable, CanActivate , ExecutionContext , UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "src/decorators/roles.decorators";

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private reflector : Reflector) {}
    canActivate(
        context: ExecutionContext): 
        boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const requiredRole = this.reflector.getAllAndOverride(ROLES_KEY, 
            [context.getClass(),
             context.getHandler()   
            ])
            const userRole = request.user.role;
            if(requiredRole !== userRole) return false
        return true
    }
}