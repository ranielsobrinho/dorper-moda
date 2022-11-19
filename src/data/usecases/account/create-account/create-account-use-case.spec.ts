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

describe('CreateAccountUseCase', () => {
  test('Should call loadAccountByUsernameRepository with correct values', async () => {
    class LoadAccountByUsernameRepositoryStub
      implements LoadAccountByUsernameRepository
    {
      async loadByUsername(
        username: string
      ): Promise<LoadAccountByUsernameRepository.Result> {
        return makeAccountModel()
      }
    }
    const loadAccountByUsernameRepositoryStub =
      new LoadAccountByUsernameRepositoryStub()
    const sut = new CreateAccountUseCase(loadAccountByUsernameRepositoryStub)
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
