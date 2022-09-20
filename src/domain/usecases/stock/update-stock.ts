import { StockModel } from '../../models/stock'

export interface UpdateStock {
  execute(params: AddStock.Params): Promise<AddStock.Result>
}

export namespace AddStock {
  export type Params = {
    stockId: string
    data: Omit<StockModel, 'id'>
  }
  export type Result = void
}
