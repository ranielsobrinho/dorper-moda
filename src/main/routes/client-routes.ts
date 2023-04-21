import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { auth } from '../middlewares'
import { makeCreateClientController } from '../factories/controllers/client/create-client/create-client-factory'
import { makeGetClientsController } from '../factories/controllers/client/get-clients/get-clients-factory'
import { makeGetClientByCpfController } from '../factories/controllers/client/get-client-by-cpf/get-client-by-cpf-factory'
import { makeDeleteClientController } from '../factories/controllers/client/delete-client/delete-client-factory'
import { makeUpdateClientController } from '../factories/controllers/client/update-client/update-client-factory'

export default (router: Router): void => {
  router.post('/clients', auth, adaptRoute(makeCreateClientController()))
  router.get('/clients', auth, adaptRoute(makeGetClientsController()))
  router.get('/clients/:cpf', auth, adaptRoute(makeGetClientByCpfController()))
  router.delete('/clients/:cpf', auth, adaptRoute(makeDeleteClientController()))
  router.put('/clients/:cpf', auth, adaptRoute(makeUpdateClientController()))
}
