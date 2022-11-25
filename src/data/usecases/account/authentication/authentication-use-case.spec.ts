import { LoadAccountByUsernameRepository } from '../../../protocols/db/account/load-account-by-username-repository'
import { AuthenticationModel } from '../../../../domain/usecases/account/authentication'
import { AuthenticationUseCase } from './authentication-use-case'

const makeAuthenticationRequest = (): AuthenticationModel => ({
  username: 'any_username',
  password: 'any_password'
})

const makeLoadAccountByUsernameRepositoryStub =
  (): LoadAccountByUsernameRepository => {
    class LoadAccountByUsernameRepositoryStub
      implements LoadAccountByUsernameRepository
    {
      async loadByUsername(
        username: string
      ): Promise<LoadAccountByUsernameRepository.Result> {
        return null
      }
    }
    return new LoadAccountByUsernameRepositoryStub()
  }

type SutTypes = {
  sut: AuthenticationUseCase
  loadAccountByUsernameRepositoryStub: LoadAccountByUsernameRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByUsernameRepositoryStub =
    makeLoadAccountByUsernameRepositoryStub()
  const sut = new AuthenticationUseCase(loadAccountByUsernameRepositoryStub)
  return {
    sut,
    loadAccountByUsernameRepositoryStub
  }
}

describe('AuthenticatioUseCase', () => {
  test('Should call loadAccountByUsernameRepository with correct values', async () => {
    const { sut, loadAccountByUsernameRepositoryStub } = makeSut()
    const loadAccountSpy = jest.spyOn(
      loadAccountByUsernameRepositoryStub,
      'loadByUsername'
    )
    await sut.auth(makeAuthenticationRequest())
    expect(loadAccountSpy).toHaveBeenCalledWith(
      makeAuthenticationRequest().username
    )
  })
})
