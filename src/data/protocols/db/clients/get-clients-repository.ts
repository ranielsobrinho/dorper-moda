import { ClientsModel } from '../../../../domain/models/clients'

export interface GetClientsRepository {
  getAll(): Promise<GetClientsRepository.Result>
}

export namespace GetClientsRepository {
  export type Result = ClientsModel[] | []
}
