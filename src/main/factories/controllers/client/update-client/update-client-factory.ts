import { UpdateClientController } from '../../../../../presentation/controllers/client/update-client/update-client-controller'
import { makeUpdateClientUseCase } from '../../../usecases/client/update-client/updateClientUseCase'
import { makeUpdateClientValidation } from './update-client-validation-factory'

export const makeUpdateClientController = (): UpdateClientController => {
  return new UpdateClientController(
    makeUpdateClientUseCase(),
    makeUpdateClientValidation()
  )
}
