import { GetSaleById } from '../../../../domain/usecases/sales/get-sale-by-id'
import { noContent, serverError } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class GetSaleByIdController implements Controller {
  constructor(private readonly getSaleById: GetSaleById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { saleId } = httpRequest.body
      await this.getSaleById.getById(saleId)
      return Promise.resolve(noContent())
    } catch (error) {
      return serverError(error)
    }
  }
}
