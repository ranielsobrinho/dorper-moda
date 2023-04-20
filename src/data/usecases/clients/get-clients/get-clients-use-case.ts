import { GetClients } from '../../../../domain/usecases/clients/get-clients'
import { GetClientsRepository } from '../../../protocols/db/clients/get-clients-repository'

export class GetClientsUseCase implements GetClients {
  constructor(private readonly getClientsRepository: GetClientsRepository) {}

  async execute(): Promise<GetClients.Result> {
    return await this.getClientsRepository.getAll()
  }
}
