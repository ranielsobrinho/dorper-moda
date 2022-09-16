import { StockModel } from '../../../../domain/models/stock'

export interface LoadStockByNameRepository {
  loadByName(name: string): Promise<StockModel | null>
}
