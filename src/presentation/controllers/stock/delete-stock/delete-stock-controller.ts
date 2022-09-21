import { DeleteStock } from '../../../../domain/usecases/stock/delete-stock'
import { noContent, serverError } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class DeleteStockController implements Controller {
  constructor(private readonly deleteStock: DeleteStock) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { stockId } = httpRequest.body
      await this.deleteStock.execute(stockId)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
