import { ClientsModel } from '../../../../domain/models/clients'
import { GetClientsRepository } from '../../../protocols/db/clients/get-clients-repository'
import { GetClientsUseCase } from './get-clients-use-case'

const makeGetClients = (): ClientsModel[] => {
  return [
    {
      name: 'any_name',
      address: 'any_address',
      cpf: 'any_cpf',
      telephone: 'any_telephone',
      baseFee: 10,
      cep: '12342-143'
    }
  ]
}

const makeGetClientsRepositoryStub = (): GetClientsRepository => {
  class GetClientsRepositoryStub implements GetClientsRepository {
    async getAll(): Promise<GetClientsRepository.Result> {
      return makeGetClients()
    }
  }
  return new GetClientsRepositoryStub()
}

type SutTypes = {
  sut: GetClientsUseCase
  getClientsRepositoryStub: GetClientsRepository
}

const makeSut = (): SutTypes => {
  const getClientsRepositoryStub = makeGetClientsRepositoryStub()
  const sut = new GetClientsUseCase(getClientsRepositoryStub)
  return {
    sut,
    getClientsRepositoryStub
  }
}

describe('CreateClientUseCase', () => {
  test('Should call GetClientsRepository with correct values', async () => {
    const { sut, getClientsRepositoryStub } = makeSut()
    const getClientsSpy = jest.spyOn(getClientsRepositoryStub, 'getAll')
    await sut.execute()
    expect(getClientsSpy).toHaveBeenCalledTimes(1)
  })

  test('Should throw if GetClientsRepository throws', async () => {
    const { sut, getClientsRepositoryStub } = makeSut()
    jest
      .spyOn(getClientsRepositoryStub, 'getAll')
      .mockRejectedValueOnce(new Error())
    const promise = sut.execute()
    await expect(promise).rejects.toThrow(new Error())
  })

  test('Should return an array of clients on success', async () => {
    const { sut } = makeSut()
    const response = await sut.execute()
    expect(response).toEqual(makeGetClients())
  })
})
