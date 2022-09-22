import { UpdateStockController } from '../../../../../presentation/controllers/stock/update-stock/update-stock-controller'
import { makeUpdateStockUseCase } from '../../../usecases/stock/update-stock/updateStockUseCase'

export const makeUpdateStockController = (): UpdateStockController => {
  return new UpdateStockController(makeUpdateStockUseCase())
}
