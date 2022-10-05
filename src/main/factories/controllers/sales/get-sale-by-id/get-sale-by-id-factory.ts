import { GetSaleByIdController } from '../../../../../presentation/controllers/sales/get-sale-by-id/get-sale-by-id-controller'
import { makeGetSaleByIdUseCase } from '../../../usecases/sales/get-sale-by-id/get-sale-by-id-use-case'

export const makeGetSaleByIdController = (): GetSaleByIdController => {
  return new GetSaleByIdController(makeGetSaleByIdUseCase())
}
