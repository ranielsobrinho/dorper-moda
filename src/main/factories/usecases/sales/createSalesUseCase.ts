import { CreateSalesUseCase } from '../../../../data/usecases/sales/create-sales/create-sales-use-case'
import { CreateSale } from '../../../../domain/usecases/sales/create-sales'
import { SalesMongoRepository } from '../../../../infra/db/mongodb/sales/sales-mongo-repository'
import { StockMongoRepository } from '../../../../infra/db/mongodb/stock/stock-mongo-repository'

export const makeCreateSalesUseCase = (): CreateSale => {
  const stockRepository = new StockMongoRepository()
  const salesRepository = new SalesMongoRepository()
  return new CreateSalesUseCase(
    stockRepository,
    stockRepository,
    salesRepository
  )
}
