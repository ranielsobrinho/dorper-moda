import { CreateSale } from '../../../../domain/usecases/sales/create-sales'
import { noContent, serverError } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class CreateSalesController implements Controller {
  constructor(private readonly createSales: CreateSale) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.createSales.execute(httpRequest.body)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
