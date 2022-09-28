import { GetSalesUseCase } from '../../../../../data/usecases/sales/get-sales/get-sales-use-case'
import { GetSales } from '../../../../../domain/usecases/sales/get-sales'
import { SalesMongoRepository } from '../../../../../infra/db/mongodb/sales/sales-mongo-repository'

export const makeGetSalesUseCase = (): GetSales => {
  const salesMongoRepository = new SalesMongoRepository()
  return new GetSalesUseCase(salesMongoRepository)
}
