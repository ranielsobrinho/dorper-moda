import { VerifyToken } from '../../domain/usecases/authentication/verify-token'
import { noContent } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../protocols'
import { Middleware } from '../protocols/middleware'

export class AuthMiddleware implements Middleware {
  constructor(private readonly verifyToken: VerifyToken) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']
    await this.verifyToken.execute(accessToken)
    return noContent()
  }
}
