import { CancelSaleController } from '../../../../../presentation/controllers/sales/cancel-sale/cancel-sale-controller'
import { makeCancelSaleUseCase } from '../../../usecases/sales/cancel-sale/cancel-sale-use-case'
import { makeGetSaleByIdUseCase } from '../../../usecases/sales/get-sale-by-id/get-sale-by-id-use-case'

export const makeCancelSaleController = (): CancelSaleController => {
  return new CancelSaleController(
    makeCancelSaleUseCase(),
    makeGetSaleByIdUseCase()
  )
}
