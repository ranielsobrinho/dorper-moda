import { GetStockByIdController } from '../../../../../presentation/controllers/stock/get-by-id/get-stock-by-id-controller'
import { makeGetStockByIdUseCase } from '../../../usecases/stock/get-by-id/getStockByIdUseCase'

export const makeGetByIdController = (): GetStockByIdController => {
  return new GetStockByIdController(makeGetStockByIdUseCase())
}
