import { StockModel } from '../../models/stock'

export interface UpdateStock {
  execute(params: UpdateStock.Params): Promise<UpdateStock.Result>
}

export namespace UpdateStock {
  export type Params = {
    stockId: string
    data: Omit<StockModel, 'id'>
  }
  export type Result = string | null
}
