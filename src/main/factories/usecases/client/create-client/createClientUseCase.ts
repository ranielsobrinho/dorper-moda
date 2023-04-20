import { CreateClientsUseCase } from '../../../../../data/usecases/clients/create-client/create-clients-use-case'
import { CreateClient } from '../../../../../domain/usecases/clients/create-client'
import { ClientsMongoRepository } from '../../../../../infra/db/mongodb/clients/clients-mongo-repository'

export const makeCreateClientUseCase = (): CreateClient => {
  const clientRepository = new ClientsMongoRepository()
  return new CreateClientsUseCase(clientRepository, clientRepository)
}
