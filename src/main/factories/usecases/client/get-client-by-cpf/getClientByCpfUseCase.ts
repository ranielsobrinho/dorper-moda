import { GetClientByCpfUseCase } from '../../../../../data/usecases/clients/get-client-by-cpf/get-client-by-cpf-use-case'
import { GetClientByCpf } from '../../../../../domain/usecases/clients/get-client-by-cpf'
import { ClientsMongoRepository } from '../../../../../infra/db/mongodb/clients/clients-mongo-repository'

export const makeGetClientByCpfUseCase = (): GetClientByCpf => {
  const clientRepository = new ClientsMongoRepository()
  return new GetClientByCpfUseCase(clientRepository)
}
