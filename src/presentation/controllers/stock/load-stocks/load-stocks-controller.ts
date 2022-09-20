import { LoadStocks } from '../../../../domain/usecases/stock/load-stock'
import { serverError } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class LoadStocksController implements Controller {
  constructor(private readonly loadStocksUseCase: LoadStocks) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.loadStocksUseCase.loadAll()
      return Promise.resolve({
        statusCode: 200,
        body: null
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
