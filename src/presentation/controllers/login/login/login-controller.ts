import { Authentication } from '../../../../domain/usecases/account/authentication'
import { noContent, unauthorized } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class LoginController implements Controller {
  constructor(private readonly authentication: Authentication) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { username, password } = httpRequest.body
    const accessToken = await this.authentication.auth({ username, password })
    if (!accessToken) {
      return unauthorized()
    }
    return noContent()
  }
}
