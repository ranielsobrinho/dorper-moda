import { AddStock } from '../../../../domain/usecases/stock/add-stock'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class AddStockController implements Controller {
  constructor(private readonly addStockUseCase: AddStock) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { modelName, color, quantity } = httpRequest.body
    await this.addStockUseCase.execute({
      modelName,
      color,
      quantity
    })
    return {
      statusCode: 204,
      body: 'ok'
    }
  }
}
