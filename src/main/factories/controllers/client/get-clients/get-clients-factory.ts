import { GetClientsController } from '../../../../../presentation/controllers/client/get-clients/get-clients-controller'
import { makeGetClientsUseCase } from '../../../usecases/client/get-clients/getClientsUseCase'

export const makeGetClientsController = (): GetClientsController => {
  return new GetClientsController(makeGetClientsUseCase())
}
