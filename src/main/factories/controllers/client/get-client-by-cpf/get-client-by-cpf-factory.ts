import { GetClientByCpfController } from '../../../../../presentation/controllers/client/get-client-by-cpf/get-client-by-cpf-controller'
import { makeGetClientByCpfUseCase } from '../../../usecases/client/get-client-by-cpf/getClientByCpfUseCase'

export const makeGetClientByCpfController = (): GetClientByCpfController => {
  return new GetClientByCpfController(makeGetClientByCpfUseCase())
}
