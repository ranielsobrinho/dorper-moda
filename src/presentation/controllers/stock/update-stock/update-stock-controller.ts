import { UpdateStock } from '../../../../domain/usecases/stock/update-stock'
import { InvalidParamError } from '../../../errors'
import { forbidden, noContent, serverError } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class UpdateStockController implements Controller {
  constructor(private readonly updateStock: UpdateStock) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { stockId } = httpRequest.params
      const { data } = httpRequest.body
      const stockData = await this.updateStock.execute({
        stockId,
        data
      })
      if (!stockData) {
        return forbidden(new InvalidParamError('stockId'))
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
