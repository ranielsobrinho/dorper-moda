import { SignupController } from '../../../../../presentation/controllers/login/signup/signup-controller'
import { makeCreateAccountUseCase } from '../../../usecases/account/create-account/create-account-use-case'
import { makeCreateAccountValidation } from './create-account-validation-factory'

export const makeCreateAccountController = (): SignupController => {
  return new SignupController(
    makeCreateAccountUseCase(),
    makeCreateAccountValidation()
  )
}
