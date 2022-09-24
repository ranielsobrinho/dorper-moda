import { SalesModel } from '../../models/sales'

export interface CreateSale {
  execute(params: CreateSale.Params): Promise<CreateSale.Result>
}

export namespace CreateSale {
  export type Params = Omit<SalesModel, 'id'>
  export type Result = void | null
}
