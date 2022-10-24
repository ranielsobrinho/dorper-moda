import { CancelSaleUseCase } from '../../../../../data/usecases/sales/cancel-sale/cancel-sale-use-case'
import { CancelSale } from '../../../../../domain/usecases/sales/cancel-sale'
import { SalesMongoRepository } from '../../../../../infra/db/mongodb/sales/sales-mongo-repository'
import { StockMongoRepository } from '../../../../../infra/db/mongodb/stock/stock-mongo-repository'

export const makeCancelSaleUseCase = (): CancelSale => {
  const salesMongoRepository = new SalesMongoRepository()
  const stockmongoRepository = new StockMongoRepository()
  return new CancelSaleUseCase(
    salesMongoRepository,
    stockmongoRepository,
    salesMongoRepository
  )
}
