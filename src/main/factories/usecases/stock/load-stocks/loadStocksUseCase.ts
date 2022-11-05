import { LoadStocksUseCase } from '../../../../../data/usecases/stock/load-stocks/load-stocks-use-case'
import { LoadStocks } from '../../../../../domain/usecases/stock/load-stock'
import { StockMongoRepository } from '../../../../../infra/db/mongodb/stock/stock-mongo-repository'

export const makeLoadStocksUseCase = (): LoadStocks => {
  const stockMongoRepository = new StockMongoRepository()
  return new LoadStocksUseCase(stockMongoRepository)
}
