import { StockModel } from '../../models/stock'

export interface GetStockById {
  execute(stockId: string): Promise<GetStockById.Result>
}

export namespace GetStockById {
  export type Result = StockModel | null
}
