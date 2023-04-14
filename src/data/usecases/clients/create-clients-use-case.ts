import { CreateClient } from '../../../domain/usecases/clients/create-client'
import { CreateClientRepository } from '../../protocols/db/clients/create-client-repository'

export class CreateClientsUseCase implements CreateClient {
  constructor(
    private readonly createClientRepository: CreateClientRepository
  ) {}

  async execute(params: CreateClient.Params): Promise<CreateClient.Result> {
    const client = await this.createClientRepository.create(params)
    return client
  }
}
