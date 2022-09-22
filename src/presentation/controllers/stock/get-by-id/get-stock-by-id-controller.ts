import { GetStockById } from '../../../../domain/usecases/stock/get-stock-by-id'
import { noContent } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class GetStockByIdController implements Controller {
  constructor(private readonly getStockById: GetStockById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { stockId } = httpRequest.body
    await this.getStockById.execute(stockId)
    return Promise.resolve(noContent())
  }
}
