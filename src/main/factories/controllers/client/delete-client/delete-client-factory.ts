import { DeleteClientController } from '../../../../../presentation/controllers/client/delete-client/delete-client-controller'
import { makeDeleteClientUseCase } from '../../../usecases/client/delete-client/deleteClientUseCase'

export const makeDeleteClientController = (): DeleteClientController => {
  return new DeleteClientController(makeDeleteClientUseCase())
}
