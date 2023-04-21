import { UpdateClient } from '../../../../domain/usecases/clients/update-client'
import { UpdateClientRepository } from '../../../protocols/db/clients/update-client-repository'
import { GetClientByCpfRepository } from '../../../protocols/db/clients/get-client-by-cpf-repository'

export class UpdateClientsUseCase implements UpdateClient {
  constructor(
    private readonly updateClientRepository: UpdateClientRepository,
    private readonly getClientByCpfRepository: GetClientByCpfRepository
  ) {}

  async execute(params: UpdateClient.Params): Promise<UpdateClient.Result> {
    const existingClient = await this.getClientByCpfRepository.getByCpf(
      params.cpf
    )
    if (existingClient) {
      const client = await this.updateClientRepository.update(params)
      return client
    }
    return null
  }
}
