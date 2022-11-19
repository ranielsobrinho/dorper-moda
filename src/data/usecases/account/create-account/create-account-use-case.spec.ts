import { AccountModel } from '../../../../domain/models/account'
import { CreateAccountModel } from '../../../../domain/usecases/account/create-account'
import { LoadAccountByUsernameRepository } from '../../../protocols/db/account/load-account-by-username-repository'
import { Encrypter } from '../../../protocols/criptography/encrypter'
import { CreateAccountUseCase } from './create-account-use-case'

const makeAccountModel = (): AccountModel => ({
  id: 'any_id',
  username: 'any_username',
  password: 'any_password',
  isAdmin: false
})

const makeCreateAccountRequest = (): CreateAccountModel => ({
  username: 'any_username',
  password: 'any_password',
  isAdmin: false
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

const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async generate(value: string): Promise<string> {
      return 'hashed_password'
    }
  }
  return new EncrypterStub()
}

type SutTypes = {
  sut: CreateAccountUseCase
  loadAccountByUsernameRepositoryStub: LoadAccountByUsernameRepository
  encrypterStub: Encrypter
}

const makeSut = (): SutTypes => {
  const loadAccountByUsernameRepositoryStub =
    makeLoadAccountByUsernameRepositoryStub()
  const encrypterStub = makeEncrypterStub()
  const sut = new CreateAccountUseCase(
    loadAccountByUsernameRepositoryStub,
    encrypterStub
  )
  return {
    sut,
    loadAccountByUsernameRepositoryStub,
    encrypterStub
  }
}

describe('CreateAccountUseCase', () => {
  test('Should call loadAccountByUsernameRepository with correct values', async () => {
    const { sut, loadAccountByUsernameRepositoryStub } = makeSut()
    const loadAccountSpy = jest.spyOn(
      loadAccountByUsernameRepositoryStub,
      'loadByUsername'
    )
    await sut.execute(makeCreateAccountRequest())
    expect(loadAccountSpy).toHaveBeenCalledWith(
      makeCreateAccountRequest().username
    )
  })

  test('Should throw if loadAccountByUsernameRepository throws', async () => {
    const { sut, loadAccountByUsernameRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountByUsernameRepositoryStub, 'loadByUsername')
      .mockRejectedValueOnce(new Error())
    const promise = sut.execute(makeCreateAccountRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if loadAccountByUsernameRepository returns an account', async () => {
    const { sut, loadAccountByUsernameRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountByUsernameRepositoryStub, 'loadByUsername')
      .mockResolvedValueOnce(makeAccountModel())
    const promise = sut.execute(makeCreateAccountRequest())
    await expect(promise).rejects.toThrow(
      new Error('Já existe uma conta com esse username.')
    )
  })

  test('Should call Encrypter with correct values', async () => {
    const { sut, encrypterStub } = makeSut()
    const encrypterSpy = jest.spyOn(encrypterStub, 'generate')
    await sut.execute(makeCreateAccountRequest())
    expect(encrypterSpy).toHaveBeenCalledWith(
      makeCreateAccountRequest().password
    )
  })
})
