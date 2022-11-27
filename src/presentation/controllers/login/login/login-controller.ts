import { Authentication } from '../../../../domain/usecases/account/authentication'
import { noContent } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class LoginController implements Controller {
  constructor(private readonly authentication: Authentication) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { username, password } = httpRequest.body
    await this.authentication.auth({ username, password })
    return noContent()
  }
}
