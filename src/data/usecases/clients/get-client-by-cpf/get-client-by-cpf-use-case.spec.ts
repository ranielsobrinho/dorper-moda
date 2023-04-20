import { ClientsModel } from '../../../../domain/models/clients'
import { GetClientByCpfUseCase } from './get-client-by-cpf-use-case'
import { GetClientByCpfRepository } from '../../../protocols/db/clients/get-client-by-cpf-repository'

const makeGetClient = (): ClientsModel => ({
  name: 'any_name',
  address: 'any_address',
  cpf: 'any_cpf',
  telephone: 'any_telephone',
  baseFee: 10
})

const makeGetClientByCpfRepositoryStub = (): GetClientByCpfRepository => {
  class GetClientByCpfRepositoryStub implements GetClientByCpfRepository {
    async getByCpf(_cpf: string): Promise<GetClientByCpfRepository.Result> {
      return makeGetClient()
    }
  }
  return new GetClientByCpfRepositoryStub()
}

type SutTypes = {
  sut: GetClientByCpfUseCase
  getClientByCpfRepositoryStub: GetClientByCpfRepository
}

const makeSut = (): SutTypes => {
  const getClientByCpfRepositoryStub = makeGetClientByCpfRepositoryStub()
  const sut = new GetClientByCpfUseCase(getClientByCpfRepositoryStub)
  return {
    sut,
    getClientByCpfRepositoryStub
  }
}

describe('GetClientByCpfUseCase', () => {
  test('Should call GetClientByCpfRepository with correct values', async () => {
    const { sut, getClientByCpfRepositoryStub } = makeSut()
    const getClientSpy = jest.spyOn(getClientByCpfRepositoryStub, 'getByCpf')
    await sut.execute('any_cpf')
    expect(getClientSpy).toHaveBeenCalledTimes(1)
  })

  test('Should throw if GetClientByCpfRepository throws', async () => {
    const { sut, getClientByCpfRepositoryStub } = makeSut()
    jest
      .spyOn(getClientByCpfRepositoryStub, 'getByCpf')
      .mockRejectedValueOnce(new Error())
    const promise = sut.execute('any_cpf')
    await expect(promise).rejects.toThrow(new Error())
  })

  test('Should return an array of clients on success', async () => {
    const { sut } = makeSut()
    const response = await sut.execute('any_cpf')
    expect(response).toEqual(makeGetClient())
  })
})
