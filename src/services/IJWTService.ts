import { JwtPayload } from "jsonwebtoken";

export interface IJWTService {
    sign (payload: JwtPayload, expiresIn: string): Promise<string | undefined>;
    verify (token: string): Promise<JwtPayload | undefined>;
}