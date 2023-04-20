import { ClientsModel } from '../../models/clients'

export interface UpdateClient {
  execute(params: UpdateClient.Params): Promise<UpdateClient.Result>
}

export namespace UpdateClient {
  export type Params = ClientsModel
  export type Result = ClientsModel | null
}
