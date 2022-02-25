import jwt, { JwtPayload } from 'jsonwebtoken'
import { secret } from '../../jwtsecret.json'
import { IJWTService } from './IJWTService'

class JWTService implements IJWTService {

    constructor (public secret: string) {
        this.secret = secret
    }

    async sign (payload: JwtPayload, expiresIn: string): Promise<string | undefined> {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, this.secret, { expiresIn: expiresIn }, (err, token) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(token)
                }
            })
        })
    }

    async verify (token: string): Promise<JwtPayload | undefined> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.secret, (err, decoded) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(decoded)
                }
            })
        })
    }

}

export const jwtService = new JWTService(secret)