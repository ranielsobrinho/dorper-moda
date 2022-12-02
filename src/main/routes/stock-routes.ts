import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddStockController } from '../factories/controllers/stock/add-stock/add-stock-factory'
import { makeDeleteStockController } from '../factories/controllers/stock/deleteStock/delete-stock-factory'
import { makeGetByIdController } from '../factories/controllers/stock/get-by-id/get-by-id-factory'
import { makeLoadStockByNameController } from '../factories/controllers/stock/load-stock-by-name/load-stock-by-name-factory'
import { makeLoadStocksController } from '../factories/controllers/stock/load-stocks/load-stocks-factory'
import { makeUpdateStockController } from '../factories/controllers/stock/update-stock/update-stock-factory'
import { auth } from '../middlewares'

export default (router: Router): void => {
  router.post('/stock', auth, adaptRoute(makeAddStockController()))
  router.get('/stock', auth, adaptRoute(makeLoadStocksController()))
  router.get('/stock/:stockId', auth, adaptRoute(makeGetByIdController()))
  router.post(
    '/stock/by-name',
    auth,
    adaptRoute(makeLoadStockByNameController())
  )
  router.delete(
    '/stock/:stockId',
    auth,
    adaptRoute(makeDeleteStockController())
  )
  router.put('/stock/:stockId', auth, adaptRoute(makeUpdateStockController()))
}
