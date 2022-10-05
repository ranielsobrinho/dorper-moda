import { SalesModel } from '../../models/sales'

export interface UpdateSale {
  execute(params: UpdateSale.Params): Promise<UpdateSale.Result>
}

export namespace UpdateSale {
  export type Params = {
    saleId: string
    data: Omit<SalesModel, 'id'>
  }
  export type Result = string | null
}
