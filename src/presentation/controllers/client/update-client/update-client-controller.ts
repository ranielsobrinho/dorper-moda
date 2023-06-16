import { UpdateClient } from '../../../../domain/usecases/clients/update-client'
import { badRequest, ok, serverError } from '../../../helpers/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from '../../../protocols'

export class UpdateClientController implements Controller {
  constructor(
    private readonly updateClient: UpdateClient,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { cpf } = httpRequest.params
      const { name, address, telephone, baseFee, cep } = httpRequest.body

      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const clientOrError = await this.updateClient.execute({
        name,
        address,
        telephone,
        cpf,
        baseFee,
        cep
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
