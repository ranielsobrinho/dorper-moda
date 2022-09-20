import { LoadStocksController } from '../../../../../presentation/controllers/stock/load-stocks/load-stocks-controller'
import { makeLoadStocksUseCase } from '../../../usecases/stock/load-stocks/loadStocksUseCase'

export const makeLoadStocksController = (): LoadStocksController => {
  return new LoadStocksController(makeLoadStocksUseCase())
}
