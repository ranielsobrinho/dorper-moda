import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeCreateAccountController } from '../factories/controllers/account/create-account/create-account-factory'
import { makeLoginController } from '../factories/controllers/account/login/login-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeCreateAccountController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
