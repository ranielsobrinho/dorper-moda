import { StockModel } from '../../models/stock'

export interface LoadStocks {
  loadAll(): Promise<LoadStocks.Result>
}

export namespace LoadStocks {
  export type Result = StockModel[]
}
