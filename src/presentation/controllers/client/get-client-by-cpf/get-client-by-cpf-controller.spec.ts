import { GetClientByCpfController } from './get-client-by-cpf-controller'
import { HttpRequest, Validation } from '../../../protocols'
import { badRequest, ok, serverError } from '../../../helpers/http-helper'
import { MissingParamError } from '../../../errors'
import { GetClientByCpf } from '../../../../domain/usecases/clients/get-client-by-cpf'
import { ClientsModel } from '../../../../domain/models/clients'

const makeFakeClientRequest = (): HttpRequest => ({
  body: {
    cpf: 'any_cpf'
  }
})

const makeCreateClientData = (): ClientsModel => ({
  name: 'any_name',
  address: 'any_address',
  cpf: 'any_cpf',
  telephone: 'any_telephone',
  baseFee: 10
})

const makeGetClientByCpfStub = (): GetClientByCpf => {
  class GetClientByCpfStub implements GetClientByCpf {
    async execute(cpf: string): Promise<GetClientByCpf.Result> {
      return Promise.resolve(makeCreateClientData())
    }
  }
  return new GetClientByCpfStub()
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
  sut: GetClientByCpfController
  getClientByCpfStub: GetClientByCpf
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const getClientByCpfStub = makeGetClientByCpfStub()
  const validationStub = makeValidationStub()
  const sut = new GetClientByCpfController(getClientByCpfStub, validationStub)
  return {
    sut,
    getClientByCpfStub,
    validationStub
  }
}

describe('GetClientByCpfController', () => {
  test('Should call GetClientByCpf with correct values', async () => {
    const { sut, getClientByCpfStub } = makeSut()
    const createClientSpy = jest.spyOn(getClientByCpfStub, 'execute')
    await sut.handle(makeFakeClientRequest())
    expect(createClientSpy).toHaveBeenCalledWith(makeFakeClientRequest().body)
  })

  test('Should return 500 if GetClientByCpf throws', async () => {
    const { sut, getClientByCpfStub } = makeSut()
    jest
      .spyOn(getClientByCpfStub, 'execute')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle(makeFakeClientRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 400 if GetClientByCpf returns null', async () => {
    const { sut, getClientByCpfStub } = makeSut()
    jest
      .spyOn(getClientByCpfStub, 'execute')
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
