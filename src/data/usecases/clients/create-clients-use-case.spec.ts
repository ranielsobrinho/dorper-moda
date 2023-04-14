import { ClientsModel } from '../../../domain/models/clients'
import { CreateClientRepository } from '../../protocols/db/clients/create-client-repository'
import { GetClientByCpfRepository } from '../../protocols/db/clients/get-client-by-cpf-repository'
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

const makeGetClientByCpfRepositoryStub = (): GetClientByCpfRepository => {
  class GetClientByCpfRepositoryStub implements GetClientByCpfRepository {
    async getByCpf(_cpf: string): Promise<GetClientByCpfRepository.Result> {
      return null
    }
  }
  return new GetClientByCpfRepositoryStub()
}

type SutTypes = {
  sut: CreateClientsUseCase
  createClientRepositoryStub: CreateClientRepository
  getClientByCpfRepositoryStub: GetClientByCpfRepository
}

const makeSut = (): SutTypes => {
  const createClientRepositoryStub = makeCreateClientRepositoryStub()
  const getClientByCpfRepositoryStub = makeGetClientByCpfRepositoryStub()
  const sut = new CreateClientsUseCase(
    createClientRepositoryStub,
    getClientByCpfRepositoryStub
  )
  return {
    sut,
    createClientRepositoryStub,
    getClientByCpfRepositoryStub
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

  test('Should call GetClientByCpfRepository with correct value', async () => {
    const { sut, getClientByCpfRepositoryStub } = makeSut()
    const getClientSpy = jest.spyOn(getClientByCpfRepositoryStub, 'getByCpf')
    await sut.execute(makeCreateClient())
    expect(getClientSpy).toHaveBeenCalledWith(makeCreateClient().cpf)
  })

  test('Should call GetClientByCpfRepository with correct value', async () => {
    const { sut, getClientByCpfRepositoryStub } = makeSut()
    jest
      .spyOn(getClientByCpfRepositoryStub, 'getByCpf')
      .mockRejectedValueOnce(new Error())
    const promise = sut.execute(makeCreateClient())
    await expect(promise).rejects.toThrow(new Error())
  })

  test('Should return a client on success', async () => {
    const { sut } = makeSut()
    const response = await sut.execute(makeCreateClient())
    expect(response).toEqual(makeCreateClient())
  })
})
