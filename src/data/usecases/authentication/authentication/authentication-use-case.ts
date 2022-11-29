import { Authentication } from '../../../../domain/usecases/authentication/authentication'
import { HashComparer } from '../../../protocols/criptography/hash-comparer'
import { TokenGenerator } from '../../../protocols/criptography/token-generator'
import { LoadAccountByUsernameRepository } from '../../../protocols/db/account/load-account-by-username-repository'

export class AuthenticationUseCase implements Authentication {
  constructor(
    private readonly loadAccountByUsernameRepository: LoadAccountByUsernameRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator
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
        const accessToken = await this.tokenGenerator.generate(account.id)
        return accessToken
      }
    }
    return null
  }
}
