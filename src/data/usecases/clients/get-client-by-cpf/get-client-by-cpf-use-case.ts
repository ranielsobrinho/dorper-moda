import { GetClientByCpf } from '../../../../domain/usecases/clients/get-client-by-cpf'
import { GetClientByCpfRepository } from '../../../protocols/db/clients/get-client-by-cpf-repository'

export class GetClientByCpfUseCase implements GetClientByCpf {
  constructor(
    private readonly getClientByCpfRepository: GetClientByCpfRepository
  ) {}

  async execute(cpf: string): Promise<GetClientByCpf.Result> {
    return await this.getClientByCpfRepository.getByCpf(cpf)
  }
}
