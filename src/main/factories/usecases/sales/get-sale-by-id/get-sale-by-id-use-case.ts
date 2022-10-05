import { GetSaleByIdUseCase } from '../../../../../data/usecases/sales/get-sale-by-id/get-sale-by-id-use-case'
import { GetSaleById } from '../../../../../domain/usecases/sales/get-sale-by-id'
import { SalesMongoRepository } from '../../../../../infra/db/mongodb/sales/sales-mongo-repository'

export const makeGetSaleByIdUseCase = (): GetSaleById => {
  const salesMongoRepository = new SalesMongoRepository()
  return new GetSaleByIdUseCase(salesMongoRepository)
}
