import { CreateAccount } from '../../../../domain/usecases/account/create-account'
import { badRequest, serverError, ok } from '../../../helpers/http-helper'
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
      if (error) {
        return badRequest(error)
      }
      const { username, password, isAdmin } = httpRequest.body
      const defaultAdminValue = isAdmin || false

      const account = await this.createAccountUseCase.execute({
        username,
        password,
        isAdmin: defaultAdminValue
      })

      if (!account) {
        return badRequest(
          new Error('Já existe uma conta com esse nome de usuário')
        )
      }
      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
