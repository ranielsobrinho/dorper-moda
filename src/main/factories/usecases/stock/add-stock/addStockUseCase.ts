import { AddStockUseCase } from '../../../../../data/usecases/stock/add-stock/addStockUseCase'
import { AddStock } from '../../../../../domain/usecases/stock/add-stock'
import { StockMongoRepository } from '../../../../../infra/db/mongodb/stock/stock-mongo-repository'

export const makeAddStockUseCase = (): AddStock => {
  const stockMongoRepository = new StockMongoRepository()
  return new AddStockUseCase(stockMongoRepository, stockMongoRepository)
}
