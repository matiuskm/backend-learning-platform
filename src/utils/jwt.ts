import jwt, { SignOptions } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret'

export function signJwt(payload: object, expiresIn = '7d') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as SignOptions)
}

export function verifyJwt<T>(token: string): T | null {
    try {
        return jwt.verify(token, JWT_SECRET) as T
    } catch (error) {
        return null
    }
}