import { DeleteStockController } from '../../../../../presentation/controllers/stock/delete-stock/delete-stock-controller'
import { makeDeleteStockUseCase } from '../../../usecases/stock/delete-stock/deleteStockUseCase'

export const makeDeleteStockController = (): DeleteStockController => {
  return new DeleteStockController(makeDeleteStockUseCase())
}
