import { GetStockByIdUseCase } from '../../../../../data/usecases/stock/get-by-id/get-stock-by-id-use-case'
import { GetStockById } from '../../../../../domain/usecases/stock/get-stock-by-id'
import { StockMongoRepository } from '../../../../../infra/db/mongodb/stock/stock-mongo-repository'

export const makeGetStockByIdUseCase = (): GetStockById => {
  const stockMongoRepository = new StockMongoRepository()
  return new GetStockByIdUseCase(stockMongoRepository)
}
