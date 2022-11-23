import { CreateAccount } from '../../../../domain/usecases/account/create-account'
import { noContent, serverError } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class SignupController implements Controller {
  constructor(private readonly createAccountUseCase: CreateAccount) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.createAccountUseCase.execute(httpRequest.body)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
