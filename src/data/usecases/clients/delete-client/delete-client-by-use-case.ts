import { DeleteClient } from '../../../../domain/usecases/clients/delete-client'
import { DeleteClientRepository } from '../../../protocols/db/clients/delete-client-repository'

export class DeleteClientUseCase implements DeleteClient {
  constructor(
    private readonly deleteClientRepository: DeleteClientRepository
  ) {}

  async execute(cpf: string): Promise<DeleteClient.Result> {
    const isDeleted = await this.deleteClientRepository.delete(cpf)
    if (isDeleted) {
      return 'OK'
    }
    return null
  }
}
