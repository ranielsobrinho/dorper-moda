import { CreateAccountUseCase } from '../../../../../data/usecases/account/create-account/create-account-use-case'
import { CreateAccount } from '../../../../../domain/usecases/account/create-account'
import { BcryptAdapter } from '../../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../../../infra/db/mongodb/account/account-mongo-repository'

export const makeCreateAccountUseCase = (): CreateAccount => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  return new CreateAccountUseCase(
    accountMongoRepository,
    bcryptAdapter,
    accountMongoRepository
  )
}
