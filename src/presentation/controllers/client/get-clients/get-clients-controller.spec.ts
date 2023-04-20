import { GetClientsController } from './get-clients-controller'
import { GetClients } from '../../../../domain/usecases/clients/get-clients'
import { ClientsModel } from '../../../../domain/models/clients'
import { ok, serverError } from '../../../helpers/http-helper'

const makeCreateClientData = (): ClientsModel[] => {
  return [
    {
      name: 'any_name',
      address: 'any_address',
      cpf: 'any_cpf',
      telephone: 'any_telephone',
      baseFee: 10
    }
  ]
}

const makeGetClientsStub = (): GetClients => {
  class GetClientsStub implements GetClients {
    async execute(): Promise<GetClients.Result> {
      return Promise.resolve(makeCreateClientData())
    }
  }
  return new GetClientsStub()
}

type SutTypes = {
  sut: GetClientsController
  getClientsStub: GetClients
}

const makeSut = (): SutTypes => {
  const getClientsStub = makeGetClientsStub()
  const sut = new GetClientsController(getClientsStub)
  return {
    sut,
    getClientsStub
  }
}

describe('GetClientsController', () => {
  test('Should call GetClients with correct values', async () => {
    const { sut, getClientsStub } = makeSut()
    const getClientsSpy = jest.spyOn(getClientsStub, 'execute')
    await sut.handle({})
    expect(getClientsSpy).toHaveBeenCalledTimes(1)
  })

  test('Should return 500 if GetClients throws', async () => {
    const { sut, getClientsStub } = makeSut()
    jest
      .spyOn(getClientsStub, 'execute')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(makeCreateClientData()))
  })
})
