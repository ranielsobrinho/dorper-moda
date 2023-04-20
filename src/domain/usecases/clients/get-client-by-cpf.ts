import { ClientsModel } from '../../models/clients'

export interface GetClientByCpf {
  execute(cpf: string): Promise<GetClientByCpf.Result>
}

export namespace GetClientByCpf {
  export type Result = ClientsModel | null
}
