import { Authentication } from '../../../../domain/usecases/account/authentication'
import { LoadAccountByUsernameRepository } from '../../../protocols/db/account/load-account-by-username-repository'

export class AuthenticationUseCase implements Authentication {
  constructor(
    private readonly loadAccountByUsernameRepository: LoadAccountByUsernameRepository
  ) {}

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    const { username } = params
    const account = await this.loadAccountByUsernameRepository.loadByUsername(
      username
    )
    if (account) {
      return 'lalala'
    }
    return null
  }
}
