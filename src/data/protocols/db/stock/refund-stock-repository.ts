import { StockModel } from '../../../../domain/models/stock'

export interface RefundStockRepository {
  refundStock(
    params: RefundStockRepository.Params
  ): Promise<RefundStockRepository.Result>
}

export namespace RefundStockRepository {
  export type Params = ProductStock[]
  export type Result = boolean
}

type ProductStock = Omit<StockModel, 'id'>
