import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeCreateSalesController } from '../factories/controllers/sales/create-sales/create-sales-factory'
import { makeGetSalesController } from '../factories/controllers/sales/get-sales/get-sales-factory'
import { makeGetSaleByIdController } from '../factories/controllers/sales/get-sale-by-id/get-sale-by-id-factory'
import { makeUpdateSaleController } from '../factories/controllers/sales/update-sale/update-sale-factory'
import { makeCancelSaleController } from '../factories/controllers/sales/cancel-sale/cancel-sale-factory'
import { auth } from '../middlewares'

export default (router: Router): void => {
  router.post('/sales', auth, adaptRoute(makeCreateSalesController()))
  router.get('/sales', auth, adaptRoute(makeGetSalesController()))
  router.get('/sales/:saleId', auth, adaptRoute(makeGetSaleByIdController()))
  router.put('/sales/:saleId', auth, adaptRoute(makeUpdateSaleController()))
  router.delete('/sales/:saleId', auth, adaptRoute(makeCancelSaleController()))
}
