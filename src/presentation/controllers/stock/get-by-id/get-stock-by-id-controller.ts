import { GetStockById } from '../../../../domain/usecases/stock/get-stock-by-id'
import { InvalidParamError } from '../../../errors'
import { forbidden, ok, serverError } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class GetStockByIdController implements Controller {
  constructor(private readonly getStockById: GetStockById) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { stockId } = httpRequest.params
      const stockData = await this.getStockById.execute(stockId)
      if (!stockData) {
        return forbidden(new InvalidParamError('stockId'))
      }
      return ok(stockData)
    } catch (error) {
      return serverError(error)
    }
  }
}
