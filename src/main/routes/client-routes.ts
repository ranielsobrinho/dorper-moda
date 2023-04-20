import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { auth } from '../middlewares'
import { makeCreateClientController } from '../factories/controllers/client/create-client/create-client-factory'
import { makeGetClientsController } from '../factories/controllers/client/get-clients/get-clients-factory'

export default (router: Router): void => {
  router.post('/clients', auth, adaptRoute(makeCreateClientController()))
  router.get('/clients', auth, adaptRoute(makeGetClientsController()))
}
