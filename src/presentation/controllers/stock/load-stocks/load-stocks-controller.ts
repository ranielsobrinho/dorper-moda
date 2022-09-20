import { LoadStocks } from '../../../../domain/usecases/stock/load-stock'
import { serverError, ok, noContent } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class LoadStocksController implements Controller {
  constructor(private readonly loadStocksUseCase: LoadStocks) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const stockData = await this.loadStocksUseCase.loadAll()
      return stockData.length ? ok(stockData) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
