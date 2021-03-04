import { Injectable, NestMiddleware } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { ExtendedRequest } from "interfaces";
import { ITokenData } from "@vrees/authentication";

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware
{
    use(req: ExtendedRequest, res: Response, next: Function)
    {
        const token = req.headers["authorization"];
        // Verify jwt token with public key
        try
        {
            jwt.verify(token, process.env.JWT_PUBLIC_KEY, {
                algorithms: ["RS256"],
            });
        } catch (error)
        {
            req.tokenData = null;
            next();
            return;
        }
        req.tokenData = jwt.decode(token) as ITokenData;
        next();
    }
}