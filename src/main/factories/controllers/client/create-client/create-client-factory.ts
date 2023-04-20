import { CreateClientController } from '../../../../../presentation/controllers/client/create-client/create-client-controller'
import { makeCreateClientUseCase } from '../../../usecases/client/create-client/createClientUseCase'
import { makeCreateClientValidation } from './create-client-validation-factory'

export const makeCreateClientController = (): CreateClientController => {
  return new CreateClientController(
    makeCreateClientUseCase(),
    makeCreateClientValidation()
  )
}
