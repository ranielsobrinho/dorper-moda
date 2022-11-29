import { VerifyToken } from '../../../../domain/usecases/authentication/verify-token'
import { TokenVerify } from '../../../protocols/criptography/token-verify'

export class VerifyTokenUseCase implements VerifyToken {
  constructor(private readonly decrypter: TokenVerify) {}

  async execute(token: string): Promise<VerifyToken.Result> {
    const verifiedToken = await this.decrypter.verify(token)
    if (!verifiedToken) {
      return null
    }
  }
}
