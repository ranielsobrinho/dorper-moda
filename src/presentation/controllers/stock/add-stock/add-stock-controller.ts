import { AddStock } from '../../../../domain/usecases/stock/add-stock'
import { serverError } from '../../../helpers/http-helper'
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
      this.validation.validate(httpRequest.body)
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
