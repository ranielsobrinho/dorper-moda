import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { auth } from '../middlewares'
import { makeCreateClientController } from '../factories/controllers/client/create-client/create-client-factory'

export default (router: Router): void => {
  router.post('/clients', auth, adaptRoute(makeCreateClientController()))
}
