import { Injectable, CanActivate , ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

const SECRET_KEY = "hxhxhxhxhxhxhxhxhx"

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const request = context.switchToHttp().getRequest()
        const token = request.headers.authorization.split(' ')[1]
        console.log(token)

        if(!token){
            throw new Error("Unauthorized")
        }
            request.user = this.jwtService.verify(token)
        } catch (error) {
            console.log(error)
            throw new Error("Unauthorized")
        }

        return true
    }
}