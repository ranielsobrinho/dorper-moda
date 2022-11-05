import { StockModel } from '../../../../domain/models/stock'

export interface LoadStockByNameRepository {
  loadByName(name: string): Promise<LoadStockByNameRepository.Result>
}

export namespace LoadStockByNameRepository {
  export type Result = StockModel | null
}
