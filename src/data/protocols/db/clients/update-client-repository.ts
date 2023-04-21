import { ClientsModel } from '../../../../domain/models/clients'

export interface UpdateClientRepository {
  update(
    params: UpdateClientRepository.Params
  ): Promise<UpdateClientRepository.Result>
}

export namespace UpdateClientRepository {
  export type Params = ClientsModel
  export type Result = ClientsModel
}
