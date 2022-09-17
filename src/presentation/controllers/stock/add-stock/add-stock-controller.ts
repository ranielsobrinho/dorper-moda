import { AddStock } from '../../../../domain/usecases/stock/add-stock'
import { badRequest, serverError } from '../../../helpers/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from '../../../protocols'

export class AddStockController implements Controller {
  constructor(
    private readonly addStockUseCase: AddStock,
    private readonly validation: Validation
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { modelName, color, quantity } = httpRequest.body
      await this.addStockUseCase.execute({
        modelName,
        color,
        quantity
      })
      return {
        statusCode: 204,
        body: 'ok'
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
