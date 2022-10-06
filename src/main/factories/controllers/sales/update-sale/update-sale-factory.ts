import { UpdateSaleController } from '../../../../../presentation/controllers/sales/update-sale/update-sale-controller'
import { makeUpdateSaleUseCase } from '../../../usecases/sales/update-sale/update-sale-use-case'
import { makeUpdateSaleValidation } from './update-sale-validation-factory'

export const makeUpdateSaleController = (): UpdateSaleController => {
  return new UpdateSaleController(
    makeUpdateSaleUseCase(),
    makeUpdateSaleValidation()
  )
}
