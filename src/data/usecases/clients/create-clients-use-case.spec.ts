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
describe('CreateClientUseCase', () => {
  test('Should call CreateClientRepository with correct values', async () => {
    class CreateClientRepositoryStub implements CreateClientRepository {
      async create(
        params: CreateClientRepository.Params
      ): Promise<CreateClientRepository.Result> {
        return makeCreateClient()
      }
    }
    const createClientRepositoryStub = new CreateClientRepositoryStub()
    const sut = new CreateClientsUseCase(createClientRepositoryStub)
    const createClientSpy = jest.spyOn(createClientRepositoryStub, 'create')
    await sut.execute(makeCreateClient())
    expect(createClientSpy).toHaveBeenCalledWith(makeCreateClient())
  })
})
