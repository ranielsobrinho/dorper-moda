import { ClientsModel } from '../../../../domain/models/clients'

export interface GetClientByCpfRepository {
  getByCpf(cpf: string): Promise<GetClientByCpfRepository.Result>
}

export namespace GetClientByCpfRepository {
  export type Result = ClientsModel | null
}
