import { LoadStockByNameUseCase } from '../../../../../data/usecases/stock/load-stock-by-name/load-stock-by-name'
import { LoadStockByName } from '../../../../../domain/usecases/stock/load-stock-by-name'
import { StockMongoRepository } from '../../../../../infra/db/mongodb/stock/stock-mongo-repository'

export const makeLoadStockByNameUseCase = (): LoadStockByName => {
  const stockMongoRepository = new StockMongoRepository()
  return new LoadStockByNameUseCase(stockMongoRepository)
}
