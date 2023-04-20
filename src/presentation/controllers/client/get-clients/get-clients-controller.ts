import { GetClients } from '../../../../domain/usecases/clients/get-clients'
import { ok, serverError } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class GetClientsController implements Controller {
  constructor(private readonly getClients: GetClients) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const clientsData = await this.getClients.execute()
      return ok(clientsData)
    } catch (error) {
      return serverError(error)
    }
  }
}
