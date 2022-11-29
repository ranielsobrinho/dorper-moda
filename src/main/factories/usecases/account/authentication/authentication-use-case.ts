import { AuthenticationUseCase } from '../../../../../data/usecases/account/authentication/authentication-use-case'
import { Authentication } from '../../../../../domain/usecases/authentication/authentication'
import { BcryptAdapter } from '../../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '../../../../../infra/db/mongodb/account/account-mongo-repository'
import env from '../../../../config/env'

export const makeAuthenticationUseCase = (): Authentication => {
  const salt = 12
  const accountRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtToken)
  return new AuthenticationUseCase(accountRepository, bcryptAdapter, jwtAdapter)
}
