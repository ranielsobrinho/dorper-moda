import { UpdateClientController } from './update-client-controller'
import { HttpRequest, Validation } from '../../../protocols'
import { badRequest, ok, serverError } from '../../../helpers/http-helper'
import { MissingParamError } from '../../../errors'
import { UpdateClient } from '../../../../domain/usecases/clients/update-client'
import { ClientsModel } from '../../../../domain/models/clients'

const makeFakeClientRequest = (): HttpRequest => ({
  params: {
    cpf: 'any_cpf'
  },
  body: {
    name: 'any_name',
    address: 'any_address',
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

const makeUpdateClientStub = (): UpdateClient => {
  class UpdateClientStub implements UpdateClient {
    async execute(params: UpdateClient.Params): Promise<UpdateClient.Result> {
      return Promise.resolve(makeCreateClientData())
    }
  }
  return new UpdateClientStub()
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
  sut: UpdateClientController
  updateClientStub: UpdateClient
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const updateClientStub = makeUpdateClientStub()
  const validationStub = makeValidationStub()
  const sut = new UpdateClientController(updateClientStub, validationStub)
  return {
    sut,
    updateClientStub,
    validationStub
  }
}

describe('UpdateClientController', () => {
  test('Should call UpdateClient with correct values', async () => {
    const { sut, updateClientStub } = makeSut()
    const createClientSpy = jest.spyOn(updateClientStub, 'execute')
    await sut.handle(makeFakeClientRequest())
    expect(createClientSpy).toHaveBeenCalledWith(makeCreateClientData())
  })

  test('Should return 500 if UpdateClient throws', async () => {
    const { sut, updateClientStub } = makeSut()
    jest
      .spyOn(updateClientStub, 'execute')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle(makeFakeClientRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 400 if UpdateClient returns null', async () => {
    const { sut, updateClientStub } = makeSut()
    jest
      .spyOn(updateClientStub, 'execute')
      .mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(makeFakeClientRequest())
    expect(httpResponse).toEqual(
      badRequest(new Error('Não há cliente com o cpf cadastrado.'))
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
