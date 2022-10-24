import { CancelSale } from '../../../../domain/usecases/sales/cancel-sale'
import { GetSaleById } from '../../../../domain/usecases/sales/get-sale-by-id'
import { noContent, serverError } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class CancelSaleController implements Controller {
  constructor(
    private readonly cancelSale: CancelSale,
    private readonly getSaleById: GetSaleById
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { saleId } = httpRequest.params
      await this.getSaleById.getById(saleId)
      await this.cancelSale.cancel(saleId)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
