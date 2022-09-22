import { UpdateStockController } from '../../../../../presentation/controllers/stock/update-stock/update-stock-controller'
import { makeUpdateStockUseCase } from '../../../usecases/stock/update-stock/updateStockUseCase'
import { makeUpdateStockValidation } from './update-stock-validation-factory'

export const makeUpdateStockController = (): UpdateStockController => {
  return new UpdateStockController(
    makeUpdateStockUseCase(),
    makeUpdateStockValidation()
  )
}
