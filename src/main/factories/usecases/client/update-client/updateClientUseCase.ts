import { UpdateClientsUseCase } from '../../../../../data/usecases/clients/update-client/update-clients-use-case'
import { UpdateClient } from '../../../../../domain/usecases/clients/update-client'
import { ClientsMongoRepository } from '../../../../../infra/db/mongodb/clients/clients-mongo-repository'

export const makeUpdateClientUseCase = (): UpdateClient => {
  const clientRepository = new ClientsMongoRepository()
  return new UpdateClientsUseCase(clientRepository, clientRepository)
}
