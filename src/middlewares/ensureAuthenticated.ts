import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authtoken = request.headers.authorization

    if (!authtoken) {
        return response.status(401).end()
    }

    const [, token] = authtoken.split(" ")

    try {
        const { sub } = verify(token, "ea315d30ece1e76b93ad80530fe1b323") as IPayload
        
        request.user_id = sub
        
        return next()
    } catch (error) {
        return response.status(401).end()
    }


}