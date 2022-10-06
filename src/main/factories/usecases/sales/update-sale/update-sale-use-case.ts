import { UpdateSaleUseCase } from '../../../../../data/usecases/sales/update-sale/update-sale-use-case'
import { UpdateSale } from '../../../../../domain/usecases/sales/update-sale'
import { SalesMongoRepository } from '../../../../../infra/db/mongodb/sales/sales-mongo-repository'

export const makeUpdateSaleUseCase = (): UpdateSale => {
  const saleMongoRepository = new SalesMongoRepository()
  return new UpdateSaleUseCase(saleMongoRepository, saleMongoRepository)
}
