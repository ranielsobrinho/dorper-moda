import { DeleteStock } from '../../../../domain/usecases/stock/delete-stock'
import { InvalidParamError } from '../../../errors'
import { forbidden, noContent, serverError } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class DeleteStockController implements Controller {
  constructor(private readonly deleteStock: DeleteStock) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { stockId } = httpRequest.params
      const deletedData = await this.deleteStock.execute(stockId)
      if (!deletedData) {
        return forbidden(new InvalidParamError('stockId'))
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
