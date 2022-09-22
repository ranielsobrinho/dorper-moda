import { UpdateStock } from '../../../../domain/usecases/stock/update-stock'
import { noContent, serverError } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class UpdateStockController implements Controller {
  constructor(private readonly updateStock: UpdateStock) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.updateStock.execute(httpRequest.body)
      return Promise.resolve(noContent())
    } catch (error) {
      return serverError(error)
    }
  }
}
