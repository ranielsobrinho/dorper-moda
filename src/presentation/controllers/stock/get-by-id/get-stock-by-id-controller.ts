import { GetStockById } from '../../../../domain/usecases/stock/get-stock-by-id'
import { noContent, serverError } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class GetStockByIdController implements Controller {
  constructor(private readonly getStockById: GetStockById) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { stockId } = httpRequest.body
      await this.getStockById.execute(stockId)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
