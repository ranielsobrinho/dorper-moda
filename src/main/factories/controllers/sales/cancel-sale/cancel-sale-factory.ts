import { CancelSaleController } from '../../../../../presentation/controllers/sales/cancel-sale/cancel-sale-controller'
import { makeCancelSaleUseCase } from '../../../usecases/sales/cancel-sale/cancel-sale-use-case'

export const makeCancelSaleController = (): CancelSaleController => {
  return new CancelSaleController(makeCancelSaleUseCase())
}
