import { CreateClientController } from './create-client-controller'
import { HttpRequest, Validation } from '../../../protocols'
import { badRequest, ok, serverError } from '../../../helpers/http-helper'
import { MissingParamError } from '../../../errors'
import { CreateClient } from '../../../../domain/usecases/clients/create-client'
import { ClientsModel } from '../../../../domain/models/clients'

const makeFakeClientRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    address: 'any_address',
    cpf: 'any_cpf',
    telephone: 'any_telephone',
    baseFee: 10
  }
})

const makeCreateClientData = (): ClientsModel => ({
  name: 'any_name',
  address: 'any_address',
  cpf: 'any_cpf',
  telephone: 'any_telephone',
  baseFee: 10
})

const makeCreateClientStub = (): CreateClient => {
  class CreateClientStub implements CreateClient {
    async execute(params: CreateClient.Params): Promise<CreateClient.Result> {
      return Promise.resolve(makeCreateClientData())
    }
  }
  return new CreateClientStub()
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
  sut: CreateClientController
  createClientStub: CreateClient
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const createClientStub = makeCreateClientStub()
  const validationStub = makeValidationStub()
  const sut = new CreateClientController(createClientStub, validationStub)
  return {
    sut,
    createClientStub,
    validationStub
  }
}

describe('CreateClientController', () => {
  test('Should call CreateClient with correct values', async () => {
    const { sut, createClientStub } = makeSut()
    const createClientSpy = jest.spyOn(createClientStub, 'execute')
    await sut.handle(makeFakeClientRequest())
    expect(createClientSpy).toHaveBeenCalledWith(makeFakeClientRequest().body)
  })

  test('Should return 500 if CreateClient throws', async () => {
    const { sut, createClientStub } = makeSut()
    jest
      .spyOn(createClientStub, 'execute')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle(makeFakeClientRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 400 if CreateClient returns null', async () => {
    const { sut, createClientStub } = makeSut()
    jest
      .spyOn(createClientStub, 'execute')
      .mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(makeFakeClientRequest())
    expect(httpResponse).toEqual(
      badRequest(new Error('Já existe um cliente com o cpf cadastrado.'))
    )
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeClientRequest())
    expect(validateSpy).toHaveBeenCalledWith(makeFakeClientRequest().body)
  })

  test('Should return 400 if Validation returns a error', async () => {
    const { sut, validationStub } = makeSut()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeClientRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeClientRequest())
    expect(httpResponse).toEqual(ok(makeCreateClientData()))
  })
})
