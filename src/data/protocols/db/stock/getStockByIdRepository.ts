import { StockModel } from '../../../../domain/models/stock'

export interface GetStockByIdRepository {
  getById(stockId: string): Promise<GetStockByIdRepository.Result>
}

export namespace GetStockByIdRepository {
  export type Result = StockModel | null
}
