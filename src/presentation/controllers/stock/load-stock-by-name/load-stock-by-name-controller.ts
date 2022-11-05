import { LoadStockByName } from '../../../../domain/usecases/stock/load-stock-by-name'
import { InvalidParamError } from '../../../errors'
import { forbidden, noContent, serverError } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class LoadStockByNameController implements Controller {
  constructor(private readonly loadStockByName: LoadStockByName) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { stockName } = httpRequest.body
      const stock = await this.loadStockByName.loadByName(stockName)
      if (!stock) {
        return forbidden(new InvalidParamError('stockName'))
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
