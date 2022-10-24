import { CancelSale } from '../../../../domain/usecases/sales/cancel-sale'
import { noContent, serverError } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class CancelSaleController implements Controller {
  constructor(private readonly cancelSale: CancelSale) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { saleId } = httpRequest.params
      await this.cancelSale.cancel(saleId)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
