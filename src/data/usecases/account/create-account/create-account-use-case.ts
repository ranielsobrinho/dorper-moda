import { CreateAccount } from '../../../../domain/usecases/account/create-account'
import { Encrypter } from '../../../protocols/criptography/encrypter'
import { LoadAccountByUsernameRepository } from '../../../protocols/db/account/load-account-by-username-repository'

export class CreateAccountUseCase implements CreateAccount {
  constructor(
    private readonly loadAccountByUsernameRepository: LoadAccountByUsernameRepository,
    private readonly encrypter: Encrypter
  ) {}

  async execute(params: CreateAccount.Params): Promise<CreateAccount.Result> {
    const { username, password } = params
    const account = await this.loadAccountByUsernameRepository.loadByUsername(
      username
    )
    if (account) {
      throw new Error('Já existe uma conta com esse username.')
    }
    await this.encrypter.generate(password)
    return null
  }
}
