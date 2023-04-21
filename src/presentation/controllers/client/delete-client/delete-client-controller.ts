import {
  badRequest,
  noContent,
  serverError
} from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { DeleteClient } from '../../../../domain/usecases/clients/delete-client'

export class DeleteClientController implements Controller {
  constructor(private readonly deleteClient: DeleteClient) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { cpf } = httpRequest.params
      const clientOrError = await this.deleteClient.execute(cpf)
      if (clientOrError === null) {
        return badRequest(new Error('Não há cliente com o cpf cadastrado.'))
      }
      return noContent()
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
