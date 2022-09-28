import { CreateSalesController } from '../../../../../presentation/controllers/sales/create-sales/create-sales-controller'
import { makeCreateSalesUseCase } from '../../../usecases/sales/createSalesUseCase'
import { makeCreatSalesValidation } from './create-sales-validation-factory'

export const makeCreateSalesController = (): CreateSalesController => {
  return new CreateSalesController(
    makeCreateSalesUseCase(),
    makeCreatSalesValidation()
  )
}
