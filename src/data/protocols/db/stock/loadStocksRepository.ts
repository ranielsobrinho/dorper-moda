import { StockModel } from '../../../../domain/models/stock'

export interface LoadStocksRepository {
  loadAll(): Promise<LoadStocksRepository.Result>
}

export namespace LoadStocksRepository {
  export type Result = StockModel[]
}
