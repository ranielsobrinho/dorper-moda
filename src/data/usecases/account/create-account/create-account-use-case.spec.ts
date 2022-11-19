import { AccountModel } from '../../../../domain/models/account'
import { CreateAccountModel } from '../../../../domain/usecases/account/create-account'
import { LoadAccountByUsernameRepository } from '../../../protocols/db/account/load-account-by-username-repository'
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
        return makeAccountModel()
      }
    }
    return new LoadAccountByUsernameRepositoryStub()
  }

type SutTypes = {
  sut: CreateAccountUseCase
  loadAccountByUsernameRepositoryStub: LoadAccountByUsernameRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByUsernameRepositoryStub =
    makeLoadAccountByUsernameRepositoryStub()
  const sut = new CreateAccountUseCase(loadAccountByUsernameRepositoryStub)
  return {
    sut,
    loadAccountByUsernameRepositoryStub
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
})
