import { StockModel } from '../../../../domain/models/stock'

export interface AddStockRepository {
  add(stockData: AddStockRepository.Params): Promise<AddStockRepository.Result>
}

export namespace AddStockRepository {
  export type Params = Omit<StockModel, 'id'>
  export type Result = void
}
