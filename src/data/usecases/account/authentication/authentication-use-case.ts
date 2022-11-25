import { Authentication } from '../../../../domain/usecases/account/authentication'
import { LoadAccountByUsernameRepository } from '../../../protocols/db/account/load-account-by-username-repository'

export class AuthenticationUseCase implements Authentication {
  constructor(
    private readonly loadAccountByUsernameRepository: LoadAccountByUsernameRepository
  ) {}

  async auth(params: Authentication.Params): Promise<string> {
    const { username } = params
    await this.loadAccountByUsernameRepository.loadByUsername(username)
    return 'lalala'
  }
}
