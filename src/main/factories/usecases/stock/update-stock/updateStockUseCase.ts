import { UpdateStockUseCase } from '../../../../../data/usecases/stock/update-stock/update-stock-use-case'
import { UpdateStock } from '../../../../../domain/usecases/stock/update-stock'
import { StockMongoRepository } from '../../../../../infra/db/mongodb/stock/stock-mongo-repository'

export const makeUpdateStockUseCase = (): UpdateStock => {
  const stockMongoRepository = new StockMongoRepository()
  return new UpdateStockUseCase(stockMongoRepository, stockMongoRepository)
}
