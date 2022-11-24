import { CreateAccount } from '../../../../domain/usecases/account/create-account'
import {
  badRequest,
  noContent,
  serverError
} from '../../../helpers/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from '../../../protocols'

export class SignupController implements Controller {
  constructor(
    private readonly createAccountUseCase: CreateAccount,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      const account = await this.createAccountUseCase.execute(httpRequest.body)
      if (!account) {
        return badRequest(
          new Error('Já existe uma conta com esse nome de usuário')
        )
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
