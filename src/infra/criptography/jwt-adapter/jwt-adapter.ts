import jwt from 'jsonwebtoken'
import { TokenGenerator } from '../../../data/protocols/criptography/token-generator'
import { TokenVerify } from '../../../data/protocols/criptography/token-verify'

export class JwtAdapter implements TokenGenerator, TokenVerify {
  constructor(private readonly salt: string) {}

  async generate(id: string): Promise<string> {
    const accessToken = jwt.sign({ id: id }, this.salt)
    return accessToken
  }

  async verify(token: string): Promise<string> {
    const verifiedToken: any = jwt.verify(token, this.salt)
    return verifiedToken
  }
}
