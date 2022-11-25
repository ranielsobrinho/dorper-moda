import { Authentication } from '../../../../domain/usecases/account/authentication'
import { HashComparer } from '../../../protocols/criptography/hash-comparer'
import { LoadAccountByUsernameRepository } from '../../../protocols/db/account/load-account-by-username-repository'

export class AuthenticationUseCase implements Authentication {
  constructor(
    private readonly loadAccountByUsernameRepository: LoadAccountByUsernameRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    const { username, password } = params
    const account = await this.loadAccountByUsernameRepository.loadByUsername(
      username
    )
    if (account) {
      const isValid = await this.hashComparer.compare(
        password,
        account?.password
      )
      if (isValid) {
        return 'lalala'
      }
    }
    return null
  }
}
