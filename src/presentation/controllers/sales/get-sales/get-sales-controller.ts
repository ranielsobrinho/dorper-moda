import { GetSales } from '../../../../domain/usecases/sales/get-sales'
import { noContent, serverError, ok } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class GetSalesController implements Controller {
  constructor(private readonly getSalesUseCase: GetSales) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const salesData = await this.getSalesUseCase.getAll()
      return salesData.length ? ok(salesData) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
