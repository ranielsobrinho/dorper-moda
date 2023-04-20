import { GetClientByCpf } from '../../../../domain/usecases/clients/get-client-by-cpf'
import { badRequest, ok, serverError } from '../../../helpers/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from '../../../protocols'

export class GetClientByCpfController implements Controller {
  constructor(
    private readonly getClientByCpf: GetClientByCpf,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const clientOrError = await this.getClientByCpf.execute({
        ...httpRequest.body
      })
      if (clientOrError === null) {
        return badRequest(new Error('Não há cliente com o cpf cadastrado.'))
      }
      return ok(clientOrError)
    } catch (error) {
      return serverError(error)
    }
  }
}
