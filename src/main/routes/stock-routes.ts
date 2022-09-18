import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddStockController } from '../factories/controllers/stock/add-stock/add-stock-factory'

export default (router: Router): void => {
  router.post('/stock', adaptRoute(makeAddStockController()))
}
