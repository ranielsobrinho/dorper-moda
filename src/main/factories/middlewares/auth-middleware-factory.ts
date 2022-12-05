import { AuthMiddleware } from '../../../presentation/middlewares/auth-middleware'
import { Middleware } from '../../../presentation/protocols'
import { makeVerifyTokenUseCase } from '../usecases/account/authentication/load-by-token-use-case'

export const makeAuthMiddleware = (): Middleware => {
  return new AuthMiddleware(makeVerifyTokenUseCase())
}
