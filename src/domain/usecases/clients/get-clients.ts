import { ClientsModel } from '../../models/clients'

export interface GetClients {
  execute(): Promise<GetClients.Result>
}

export namespace GetClients {
  export type Result = ClientsModel[] | []
}
