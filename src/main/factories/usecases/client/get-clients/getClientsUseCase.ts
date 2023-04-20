import { GetClientsUseCase } from '../../../../../data/usecases/clients/get-clients/get-clients-use-case'
import { GetClients } from '../../../../../domain/usecases/clients/get-clients'
import { ClientsMongoRepository } from '../../../../../infra/db/mongodb/clients/clients-mongo-repository'

export const makeGetClientsUseCase = (): GetClients => {
  const clientRepository = new ClientsMongoRepository()
  return new GetClientsUseCase(clientRepository)
}
