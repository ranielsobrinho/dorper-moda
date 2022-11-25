import { LoadAccountByUsernameRepository } from '../../../protocols/db/account/load-account-by-username-repository'
import { HashComparer } from '../../../protocols/criptography/hash-comparer'
import { TokenGenerator } from '../../../protocols/criptography/token-generator'
import { AuthenticationModel } from '../../../../domain/usecases/account/authentication'
import { AuthenticationUseCase } from './authentication-use-case'
import { AccountModel } from '../../../../domain/models/account'

const makeAuthenticationRequest = (): AuthenticationModel => ({
  username: 'any_username',
  password: 'any_password'
})

const makeAccountModel = (): AccountModel => ({
  id: 'any_id',
  username: 'any_username',
  password: 'hashed_password',
  isAdmin: false
})

const makeLoadAccountByUsernameRepositoryStub =
  (): LoadAccountByUsernameRepository => {
    class LoadAccountByUsernameRepositoryStub
      implements LoadAccountByUsernameRepository
    {
      async loadByUsername(): Promise<LoadAccountByUsernameRepository.Result> {
        return makeAccountModel()
      }
    }
    return new LoadAccountByUsernameRepositoryStub()
  }

const makeHashComparerStub = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare(): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new HashComparerStub()
}

const makeTokenGeneratorStub = (): TokenGenerator => {
  class TokenGeneratorStub implements TokenGenerator {
    async generate(): Promise<string> {
      return Promise.resolve('any_token')
    }
  }
  return new TokenGeneratorStub()
}

type SutTypes = {
  sut: AuthenticationUseCase
  loadAccountByUsernameRepositoryStub: LoadAccountByUsernameRepository
  hashComparerStub: HashComparer
  tokenGeneratorStub: TokenGenerator
}

const makeSut = (): SutTypes => {
  const loadAccountByUsernameRepositoryStub =
    makeLoadAccountByUsernameRepositoryStub()
  const hashComparerStub = makeHashComparerStub()
  const tokenGeneratorStub = makeTokenGeneratorStub()
  const sut = new AuthenticationUseCase(
    loadAccountByUsernameRepositoryStub,
    hashComparerStub,
    tokenGeneratorStub
  )
  return {
    sut,
    loadAccountByUsernameRepositoryStub,
    hashComparerStub,
    tokenGeneratorStub
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

  test('Should throw if loadAccountByUsernameRepository throws', async () => {
    const { sut, loadAccountByUsernameRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountByUsernameRepositoryStub, 'loadByUsername')
      .mockRejectedValueOnce(new Error())
    const promise = sut.auth(makeAuthenticationRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if loadAccountByUsernameRepository returns null', async () => {
    const { sut, loadAccountByUsernameRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountByUsernameRepositoryStub, 'loadByUsername')
      .mockResolvedValueOnce(null)
    const accessToken = await sut.auth(makeAuthenticationRequest())
    expect(accessToken).toBeNull()
  })

  test('Should call HashComparer with correct values', async () => {
    const { sut, hashComparerStub } = makeSut()
    const hashCompareSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth(makeAuthenticationRequest())
    expect(hashCompareSpy).toHaveBeenCalledWith(
      makeAuthenticationRequest().password,
      makeAccountModel().password
    )
  })

  test('Should throw if HashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockRejectedValueOnce(new Error())
    const promise = sut.auth(makeAuthenticationRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if HashComparer returns false', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockResolvedValueOnce(false)
    const accessToken = await sut.auth(makeAuthenticationRequest())
    expect(accessToken).toBeNull()
  })

  test('Should call TokenGenerator with correct values', async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    const tokenGeneratorSpy = jest.spyOn(tokenGeneratorStub, 'generate')
    await sut.auth(makeAuthenticationRequest())
    expect(tokenGeneratorSpy).toHaveBeenCalledWith(makeAccountModel().id)
  })
})
