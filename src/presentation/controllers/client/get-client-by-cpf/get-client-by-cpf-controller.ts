import { GetClientByCpf } from '../../../../domain/usecases/clients/get-client-by-cpf'
import { badRequest, ok, serverError } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class GetClientByCpfController implements Controller {
  constructor(private readonly getClientByCpf: GetClientByCpf) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { cpf } = httpRequest.headers
      const clientOrError = await this.getClientByCpf.execute(cpf)
      if (clientOrError === null) {
        return badRequest(new Error('Não há cliente com o cpf cadastrado.'))
      }
      return ok(clientOrError)
    } catch (error) {
      return serverError(error)
    }
  }
}
