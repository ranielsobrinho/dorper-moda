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

const makeCreateAccountStub = (): CreateAccount => {
  class CreateAccountStub implements CreateAccount {
    async execute(params: CreateAccount.Params): Promise<CreateAccount.Result> {
      return makeAccountModel()
    }
  }
  return new CreateAccountStub()
}

type SutTypes = {
  sut: SignupController
  createAccountStub: CreateAccount
}

const makeSut = (): SutTypes => {
  const createAccountStub = makeCreateAccountStub()
  const sut = new SignupController(createAccountStub)
  return {
    sut,
    createAccountStub
  }
}

describe('SignupController', () => {
  test('Should call CreateAccount with correct values', async () => {
    const { sut, createAccountStub } = makeSut()
    const createAccountSpy = jest.spyOn(createAccountStub, 'execute')
    await sut.handle(makeRequest())
    expect(createAccountSpy).toHaveBeenCalledWith(makeRequest().body)
  })
})
