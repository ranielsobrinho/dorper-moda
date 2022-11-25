import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeCreateAccountController } from '../factories/controllers/account/create-account/create-account-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeCreateAccountController()))
}
