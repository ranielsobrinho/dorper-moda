import { AddStockController } from '../../../../../presentation/controllers/stock/add-stock/add-stock-controller'
import { makeAddStockUseCase } from '../../../usecases/stock/add-stock/addStockUseCase'
import { makeAddStockValidation } from './add-stock-validation-factory'

export const makeAddStockController = (): AddStockController => {
  return new AddStockController(makeAddStockUseCase(), makeAddStockValidation())
}
