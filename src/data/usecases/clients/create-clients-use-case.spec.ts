import { ClientsModel } from '../../../domain/models/clients'
import { CreateClientRepository } from '../../protocols/db/clients/create-client-repository'
import { CreateClientsUseCase } from './create-clients-use-case'

const makeCreateClient = (): ClientsModel => ({
  name: 'any_name',
  address: 'any_address',
  cpf: 'any_cpf',
  telephone: 'any_telephone',
  baseFee: 10
})

const makeCreateClientRepositoryStub = (): CreateClientRepository => {
  class CreateClientRepositoryStub implements CreateClientRepository {
    async create(
      params: CreateClientRepository.Params
    ): Promise<CreateClientRepository.Result> {
      return makeCreateClient()
    }
  }
  return new CreateClientRepositoryStub()
}

type SutTypes = {
  sut: CreateClientsUseCase
  createClientRepositoryStub: CreateClientRepository
}

const makeSut = (): SutTypes => {
  const createClientRepositoryStub = makeCreateClientRepositoryStub()
  const sut = new CreateClientsUseCase(createClientRepositoryStub)
  return {
    sut,
    createClientRepositoryStub
  }
}

describe('CreateClientUseCase', () => {
  test('Should call CreateClientRepository with correct values', async () => {
    const { sut, createClientRepositoryStub } = makeSut()
    const createClientSpy = jest.spyOn(createClientRepositoryStub, 'create')
    await sut.execute(makeCreateClient())
    expect(createClientSpy).toHaveBeenCalledWith(makeCreateClient())
  })

  test('Should throw if CreateClientRepository throws', async () => {
    const { sut, createClientRepositoryStub } = makeSut()
    jest
      .spyOn(createClientRepositoryStub, 'create')
      .mockRejectedValueOnce(new Error())
    const promise = sut.execute(makeCreateClient())
    await expect(promise).rejects.toThrow(new Error())
  })
})
