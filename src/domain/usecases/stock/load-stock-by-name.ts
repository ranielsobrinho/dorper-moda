import { StockModel } from '../../models/stock'

export interface GetStockByName {
  loadByName(stockName: string): Promise<LoadStockByName.Result>
}

export namespace LoadStockByName {
  export type Result = StockModel
}
