import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddStockController } from '../factories/controllers/stock/add-stock/add-stock-factory'
import { makeDeleteStockController } from '../factories/controllers/stock/deleteStock/delete-stock-factory'
import { makeGetByIdController } from '../factories/controllers/stock/get-by-id/get-by-id-factory'
import { makeLoadStocksController } from '../factories/controllers/stock/load-stocks/load-stocks-factory'
import { makeUpdateStockController } from '../factories/controllers/stock/update-stock/update-stock-factory'

export default (router: Router): void => {
  router.post('/stock', adaptRoute(makeAddStockController()))
  router.get('/stock', adaptRoute(makeLoadStocksController()))
  router.get('/stock/:stockId', adaptRoute(makeGetByIdController()))
  router.delete('/stock/:stockId', adaptRoute(makeDeleteStockController()))
  router.put('/stock/:stockId', adaptRoute(makeUpdateStockController()))
}
