import { LoadStockByNameController } from '../../../../../presentation/controllers/stock/load-stock-by-name/load-stock-by-name-controller'
import { makeLoadStockByNameUseCase } from '../../../usecases/stock/load-stock-by-name/load-stock-by-name-use-case'
import { makeLoadStockByNameValidation } from './load-stock-by-name-validation-factory'

export const makeLoadStockByNameController = (): LoadStockByNameController => {
  return new LoadStockByNameController(
    makeLoadStockByNameUseCase(),
    makeLoadStockByNameValidation()
  )
}
