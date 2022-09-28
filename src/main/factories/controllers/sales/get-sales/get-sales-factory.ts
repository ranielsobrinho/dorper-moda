import { GetSalesController } from '../../../../../presentation/controllers/sales/get-sales/get-sales-controller'
import { makeGetSalesUseCase } from '../../../usecases/sales/get-sales/get-sales-use-case'

export const makeGetSalesController = (): GetSalesController => {
  return new GetSalesController(makeGetSalesUseCase())
}
