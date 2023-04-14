import { CreateClient } from '../../../domain/usecases/clients/create-client'
import { CreateClientRepository } from '../../protocols/db/clients/create-client-repository'
import { GetClientByCpfRepository } from '../../protocols/db/clients/get-client-by-cpf-repository'

export class CreateClientsUseCase implements CreateClient {
  constructor(
    private readonly createClientRepository: CreateClientRepository,
    private readonly getClientByCpfRepository: GetClientByCpfRepository
  ) {}

  async execute(params: CreateClient.Params): Promise<CreateClient.Result> {
    await this.getClientByCpfRepository.getByCpf(params.cpf)
    const client = await this.createClientRepository.create(params)
    return client
  }
}
