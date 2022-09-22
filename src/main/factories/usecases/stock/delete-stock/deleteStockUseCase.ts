import { DeleteStockUseCase } from '../../../../../data/usecases/stock/delete-stock/deleteStockUseCase'
import { DeleteStock } from '../../../../../domain/usecases/stock/delete-stock'
import { StockMongoRepository } from '../../../../../infra/db/mongodb/stock/stock-mongo-repository'

export const makeDeleteStockUseCase = (): DeleteStock => {
  const stockMongoRepository = new StockMongoRepository()
  return new DeleteStockUseCase(stockMongoRepository)
}
