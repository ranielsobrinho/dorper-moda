import jwt from 'jsonwebtoken'
import { TokenGenerator } from '../../../data/protocols/criptography/token-generator'

export class JwtAdapter implements TokenGenerator {
  constructor(private readonly salt: string) {}

  async generate(id: string): Promise<string> {
    const accessToken = jwt.sign({ id: id }, this.salt)
    return accessToken
  }
}
