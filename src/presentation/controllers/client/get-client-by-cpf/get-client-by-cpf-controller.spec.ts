import { GetClientByCpfController } from './get-client-by-cpf-controller'
import { HttpRequest } from '../../../protocols'
import { badRequest, ok, serverError } from '../../../helpers/http-helper'
import { GetClientByCpf } from '../../../../domain/usecases/clients/get-client-by-cpf'
import { ClientsModel } from '../../../../domain/models/clients'

const makeFakeClientRequest = (): HttpRequest => ({
  params: {
    cpf: 'any_cpf'
  }
})

const makeCreateClientData = (): ClientsModel => ({
  name: 'any_name',
  address: 'any_address',
  cpf: 'any_cpf',
  telephone: 'any_telephone',
  baseFee: 10,
  cep: '12342-143'
})

const makeGetClientByCpfStub = (): GetClientByCpf => {
  class GetClientByCpfStub implements GetClientByCpf {
    async execute(cpf: string): Promise<GetClientByCpf.Result> {
      return Promise.resolve(makeCreateClientData())
    }
  }
  return new GetClientByCpfStub()
}

type SutTypes = {
  sut: GetClientByCpfController
  getClientByCpfStub: GetClientByCpf
}

const makeSut = (): SutTypes => {
  const getClientByCpfStub = makeGetClientByCpfStub()
  const sut = new GetClientByCpfController(getClientByCpfStub)
  return {
    sut,
    getClientByCpfStub
  }
}

describe('GetClientByCpfController', () => {
  test('Should call GetClientByCpf with correct values', async () => {
    const { sut, getClientByCpfStub } = makeSut()
    const createClientSpy = jest.spyOn(getClientByCpfStub, 'execute')
    await sut.handle(makeFakeClientRequest())
    expect(createClientSpy).toHaveBeenCalledWith('any_cpf')
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

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeClientRequest())
    expect(httpResponse).toEqual(ok(makeCreateClientData()))
  })
})
