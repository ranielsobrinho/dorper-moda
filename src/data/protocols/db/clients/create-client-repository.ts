import { ClientsModel } from '../../../../domain/models/clients'

export interface CreateClientRepository {
  create(
    params: CreateClientRepository.Params
  ): Promise<CreateClientRepository.Result>
}

export namespace CreateClientRepository {
  export type Params = ClientsModel
  export type Result = ClientsModel
}
