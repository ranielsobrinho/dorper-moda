import { StockModel } from '../../models/stock'

export interface LoadStockByName {
  loadByName(stockName: string): Promise<LoadStockByName.Result>
}

export namespace LoadStockByName {
  export type Result = StockModel | null
}
