import { CreateClient } from '../../../../domain/usecases/clients/create-client'
import { badRequest, ok, serverError } from '../../../helpers/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from '../../../protocols'

export class CreateClientController implements Controller {
  constructor(
    private readonly createClient: CreateClient,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const clientOrError = await this.createClient.execute({
        ...httpRequest.body
      })
      if (clientOrError === null) {
        return badRequest(
          new Error('Já existe um cliente com o cpf cadastrado.')
        )
      }
      return ok(clientOrError)
    } catch (error) {
      return serverError(error)
    }
  }
}
