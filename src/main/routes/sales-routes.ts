import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeCreateSalesController } from '../factories/controllers/sales/create-sales/create-sales-factory'

export default (router: Router): void => {
  router.post('/sales', adaptRoute(makeCreateSalesController()))
}
