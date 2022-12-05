import { VerifyTokenUseCase } from '../../../../../data/usecases/authentication/verify-token/verify-token-use-case'
import { VerifyToken } from '../../../../../domain/usecases/authentication/verify-token'
import { JwtAdapter } from '../../../../../infra/criptography/jwt-adapter/jwt-adapter'
import env from '../../../../config/env'

export const makeVerifyTokenUseCase = (): VerifyToken => {
  const jwtAdapter = new JwtAdapter(env.jwtToken)
  return new VerifyTokenUseCase(jwtAdapter)
}
