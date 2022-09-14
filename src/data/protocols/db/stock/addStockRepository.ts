import { AddStock } from '../../../../domain/usecases/stock/add-stock'

export interface AddStockRepository {
  add(stockData: AddStock.Params): Promise<AddStock.Result>
}
