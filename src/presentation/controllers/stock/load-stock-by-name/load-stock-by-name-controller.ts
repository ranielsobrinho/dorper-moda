import { LoadStockByName } from '../../../../domain/usecases/stock/load-stock-by-name'
import { noContent, serverError } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class LoadStockByNameController implements Controller {
  constructor(private readonly loadStockByName: LoadStockByName) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { stockName } = httpRequest.body
      await this.loadStockByName.loadByName(stockName)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
