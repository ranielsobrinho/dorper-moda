import { AccountModel } from '../../../../domain/models/account'
import { CreateAccount } from '../../../../domain/usecases/account/create-account'
import { HttpRequest } from '../../../protocols/http'
import { SignupController } from './signup-controller'

const makeRequest = (): HttpRequest => ({
  body: {
    username: 'any_username',
    password: 'any_password',
    isAdmin: false
  }
})

const makeAccountModel = (): AccountModel => ({
  id: 'any_id',
  username: 'any_username',
  password: 'hashed_password',
  isAdmin: false
})

describe('SignupController', () => {
  test('Should call CreateAccount with correct values', async () => {
    class CreateAccountStub implements CreateAccount {
      async execute(
        params: CreateAccount.Params
      ): Promise<CreateAccount.Result> {
        return makeAccountModel()
      }
    }
    const createAccountStub = new CreateAccountStub()
    const sut = new SignupController(createAccountStub)
    const createAccountSpy = jest.spyOn(createAccountStub, 'execute')
    await sut.handle(makeRequest())
    expect(createAccountSpy).toHaveBeenCalledWith(makeRequest().body)
  })
})
