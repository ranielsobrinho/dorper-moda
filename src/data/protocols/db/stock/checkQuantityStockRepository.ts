import { StockModel } from '../../../../domain/models/stock'

export interface CheckQuantityStockRepository {
  checkStockQuantity(
    data: CheckQuantityStockRepository.Params
  ): Promise<CheckQuantityStockRepository.Result>
}

export namespace CheckQuantityStockRepository {
  export type Params = params[]
  export type Result = boolean
}

type params = Omit<StockModel, 'id'>
