import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeCreateSalesController } from '../factories/controllers/sales/create-sales/create-sales-factory'
import { makeGetSalesController } from '../factories/controllers/sales/get-sales/get-sales-factory'
import { makeGetSaleByIdController } from '../factories/controllers/sales/get-sale-by-id/get-sale-by-id-factory'

export default (router: Router): void => {
  router.post('/sales', adaptRoute(makeCreateSalesController()))
  router.get('/sales', adaptRoute(makeGetSalesController()))
  router.get('/sales/:saleId', adaptRoute(makeGetSaleByIdController()))
}
