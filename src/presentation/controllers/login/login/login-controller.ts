import { Authentication } from '../../../../domain/usecases/account/authentication'
import { ok, serverError, unauthorized } from '../../../helpers/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from '../../../protocols'

export class LoginController implements Controller {
  constructor(
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { username, password } = httpRequest.body
      this.validation.validate(httpRequest.body)
      const accessToken = await this.authentication.auth({ username, password })
      if (!accessToken) {
        return unauthorized()
      }
      return ok(accessToken)
    } catch (error) {
      return serverError(error)
    }
  }
}
