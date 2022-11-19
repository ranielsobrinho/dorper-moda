import { CreateAccount } from '../../../../domain/usecases/account/create-account'
import { LoadAccountByUsernameRepository } from '../../../protocols/db/account/load-account-by-username-repository'

export class CreateAccountUseCase implements CreateAccount {
  constructor(
    private readonly loadAccountByUsernameRepository: LoadAccountByUsernameRepository
  ) {}

  async execute(params: CreateAccount.Params): Promise<CreateAccount.Result> {
    const { username } = params
    const account = await this.loadAccountByUsernameRepository.loadByUsername(
      username
    )
    if (account) {
      throw new Error('Já existe uma conta com esse username.')
    }
    return null
  }
}
