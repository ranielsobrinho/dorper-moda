import { StockModel } from '../../../../domain/models/stock'

export interface UpdateStockRepository {
  update(
    params: UpdateStockRepository.Params
  ): Promise<UpdateStockRepository.Result>
}

export namespace UpdateStockRepository {
  export type Params = {
    stockId: string
    data: Omit<StockModel, 'id'>
  }
  export type Result = void
}
