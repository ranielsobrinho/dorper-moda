import { AccountModel } from '../../../../domain/models/account'
import { CreateAccount } from '../../../../domain/usecases/account/create-account'
import { MissingParamError } from '../../../errors'
import { badRequest, serverError, ok } from '../../../helpers/http-helper'
import { Validation } from '../../../protocols'
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

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

type SutTypes = {
  sut: SignupController
  createAccountStub: CreateAccount
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const createAccountStub = makeCreateAccountStub()
  const validationStub = makeValidationStub()
  const sut = new SignupController(createAccountStub, validationStub)
  return {
    sut,
    createAccountStub,
    validationStub
  }
}

describe('SignupController', () => {
  test('Should call CreateAccount with correct values', async () => {
    const { sut, createAccountStub } = makeSut()
    const createAccountSpy = jest.spyOn(createAccountStub, 'execute')
    await sut.handle(makeRequest())
    expect(createAccountSpy).toHaveBeenCalledWith(makeRequest().body)
  })

  test('Should return 500 if CreateAccount throws', async () => {
    const { sut, createAccountStub } = makeSut()
    jest.spyOn(createAccountStub, 'execute').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 400 if CreateAccount returns null', async () => {
    const { sut, createAccountStub } = makeSut()
    jest.spyOn(createAccountStub, 'execute').mockResolvedValueOnce(null)
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse).toEqual(
      badRequest(new Error('Já existe uma conta com esse nome de usuário'))
    )
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeRequest())
    expect(validateSpy).toHaveBeenCalledWith(makeRequest().body)
  })

  test('Should return 400 if Validation returns a error', async () => {
    const { sut, validationStub } = makeSut()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse).toEqual(ok(makeAccountModel()))
  })
})
