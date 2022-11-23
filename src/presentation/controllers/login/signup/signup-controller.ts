import { CreateAccount } from '../../../../domain/usecases/account/create-account'
import { noContent } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class SignupController implements Controller {
  constructor(private readonly createAccountUseCase: CreateAccount) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.createAccountUseCase.execute(httpRequest.body)
    return noContent()
  }
}
