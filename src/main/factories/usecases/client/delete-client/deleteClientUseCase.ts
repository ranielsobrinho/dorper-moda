import { DeleteClientUseCase } from '../../../../../data/usecases/clients/delete-client/delete-client-by-use-case'
import { DeleteClient } from '../../../../../domain/usecases/clients/delete-client'
import { ClientsMongoRepository } from '../../../../../infra/db/mongodb/clients/clients-mongo-repository'

export const makeDeleteClientUseCase = (): DeleteClient => {
  const clientRepository = new ClientsMongoRepository()
  return new DeleteClientUseCase(clientRepository)
}
