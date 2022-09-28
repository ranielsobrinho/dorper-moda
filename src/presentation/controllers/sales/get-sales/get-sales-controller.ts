import { GetSales } from '../../../../domain/usecases/sales/get-sales'
import { noContent } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class GetSalesController implements Controller {
  constructor(private readonly getSalesUseCase: GetSales) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.getSalesUseCase.getAll()
    return Promise.resolve(noContent())
  }
}
