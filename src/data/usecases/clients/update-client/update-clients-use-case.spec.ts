import { ClientsModel } from '../../../../domain/models/clients'
import { GetClientByCpfRepository } from '../../../protocols/db/clients/get-client-by-cpf-repository'
import { UpdateClientRepository } from '../../../protocols/db/clients/update-client-repository'
import { UpdateClientsUseCase } from './update-clients-use-case'

const makeUpdateClient = (): ClientsModel => ({
  name: 'any_name',
  address: 'any_address',
  cpf: 'any_cpf',
  telephone: 'any_telephone',
  baseFee: 10,
  cep: '12342-143'
})

const makeUpdateClientRepositoryStub = (): UpdateClientRepository => {
  class UpdateClientRepositoryStub implements UpdateClientRepository {
    async update(
      params: UpdateClientRepository.Params
    ): Promise<UpdateClientRepository.Result> {
      return makeUpdateClient()
    }
  }
  return new UpdateClientRepositoryStub()
}

const makeGetClientByCpfRepositoryStub = (): GetClientByCpfRepository => {
  class GetClientByCpfRepositoryStub implements GetClientByCpfRepository {
    async getByCpf(_cpf: string): Promise<GetClientByCpfRepository.Result> {
      return makeUpdateClient()
    }
  }
  return new GetClientByCpfRepositoryStub()
}

type SutTypes = {
  sut: UpdateClientsUseCase
  updateClientRepositoryStub: UpdateClientRepository
  getClientByCpfRepositoryStub: GetClientByCpfRepository
}

const makeSut = (): SutTypes => {
  const updateClientRepositoryStub = makeUpdateClientRepositoryStub()
  const getClientByCpfRepositoryStub = makeGetClientByCpfRepositoryStub()
  const sut = new UpdateClientsUseCase(
    updateClientRepositoryStub,
    getClientByCpfRepositoryStub
  )
  return {
    sut,
    updateClientRepositoryStub,
    getClientByCpfRepositoryStub
  }
}

describe('UpdateClientsUseCase', () => {
  test('Should call GetClientByCpfRepository with correct value', async () => {
    const { sut, getClientByCpfRepositoryStub } = makeSut()
    const getClientSpy = jest.spyOn(getClientByCpfRepositoryStub, 'getByCpf')
    await sut.execute(makeUpdateClient())
    expect(getClientSpy).toHaveBeenCalledWith(makeUpdateClient().cpf)
  })

  test('Should return null if GetClientByCpfRepository returns null', async () => {
    const { sut, getClientByCpfRepositoryStub } = makeSut()
    jest
      .spyOn(getClientByCpfRepositoryStub, 'getByCpf')
      .mockResolvedValueOnce(null)
    const response = await sut.execute(makeUpdateClient())
    expect(response).toBeNull()
  })

  test('Should throw if GetClientByCpfRepository throws', async () => {
    const { sut, getClientByCpfRepositoryStub } = makeSut()
    jest
      .spyOn(getClientByCpfRepositoryStub, 'getByCpf')
      .mockRejectedValueOnce(new Error())
    const promise = sut.execute(makeUpdateClient())
    await expect(promise).rejects.toThrow(new Error())
  })

  test('Should call UpdateClientRepository with correct values', async () => {
    const { sut, updateClientRepositoryStub } = makeSut()
    const createClientSpy = jest.spyOn(updateClientRepositoryStub, 'update')
    await sut.execute(makeUpdateClient())
    expect(createClientSpy).toHaveBeenCalledWith(makeUpdateClient())
  })

  test('Should throw if UpdateClientRepository throws', async () => {
    const { sut, updateClientRepositoryStub } = makeSut()
    jest
      .spyOn(updateClientRepositoryStub, 'update')
      .mockRejectedValueOnce(new Error())
    const promise = sut.execute(makeUpdateClient())
    await expect(promise).rejects.toThrow(new Error())
  })

  test('Should return a client on success', async () => {
    const { sut } = makeSut()
    const response = await sut.execute(makeUpdateClient())
    expect(response).toEqual(makeUpdateClient())
  })
})
