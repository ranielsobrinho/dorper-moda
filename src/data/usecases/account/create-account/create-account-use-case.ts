import { CreateAccount } from '../../../../domain/usecases/account/create-account'
import { Encrypter } from '../../../protocols/criptography/encrypter'
import { AddAccountRepository } from '../../../protocols/db/account/add-account-repository'
import { LoadAccountByUsernameRepository } from '../../../protocols/db/account/load-account-by-username-repository'

export class CreateAccountUseCase implements CreateAccount {
  constructor(
    private readonly loadAccountByUsernameRepository: LoadAccountByUsernameRepository,
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async execute(params: CreateAccount.Params): Promise<CreateAccount.Result> {
    const { username, password } = params
    const existingAccount =
      await this.loadAccountByUsernameRepository.loadByUsername(username)
    if (!existingAccount) {
      const hashedPassword = await this.encrypter.generate(password)
      const createdAccount = await this.addAccountRepository.create(
        Object.assign({}, params, { password: hashedPassword })
      )
      return createdAccount
    }
    return null
  }
}
