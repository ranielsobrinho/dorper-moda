import { LoginController } from '../../../../../presentation/controllers/login/login/login-controller'
import { makeAuthenticationUseCase } from '../../../usecases/account/authentication/authentication-use-case'
import { makeAuthenticationValidation } from './login-validation-factory'

export const makeLoginController = (): LoginController => {
  return new LoginController(
    makeAuthenticationUseCase(),
    makeAuthenticationValidation()
  )
}
