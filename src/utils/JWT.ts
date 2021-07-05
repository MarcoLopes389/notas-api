import jwt from 'jsonwebtoken'
import { secret } from '../../jwtsecret.json'

export class JWTservice {

    public static async sign (payload: any, expiresIn: string) {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, secret, { expiresIn: expiresIn }, (err, token) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(token)
                }
            })
        })
    }

    public static async verify (token: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, decoded) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(decoded)
                }
            })
        })
    }

}