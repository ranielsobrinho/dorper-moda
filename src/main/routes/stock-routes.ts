import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddStockController } from '../factories/controllers/stock/add-stock/add-stock-factory'
import { makeLoadStocksController } from '../factories/controllers/stock/load-stocks/load-stocks-factory'

export default (router: Router): void => {
  router.post('/stock', adaptRoute(makeAddStockController()))
  router.get('/stock', adaptRoute(makeLoadStocksController()))
}
