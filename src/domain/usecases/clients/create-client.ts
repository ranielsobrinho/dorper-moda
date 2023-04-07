import { ClientsModel } from '../../models/clients'

export interface CreateClient {
  execute(params: CreateClient.Params): Promise<CreateClient.Result>
}

export namespace CreateClient {
  export type Params = ClientsModel
  export type Result = ClientsModel
}
