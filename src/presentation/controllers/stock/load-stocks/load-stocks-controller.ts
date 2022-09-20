import { LoadStocks } from '../../../../domain/usecases/stock/load-stock'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class LoadStocksController implements Controller {
  constructor(private readonly loadStocksUseCase: LoadStocks) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadStocksUseCase.loadAll()
    return Promise.resolve({
      statusCode: 200,
      body: null
    })
  }
}
