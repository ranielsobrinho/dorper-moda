import { UpdateSale } from '../../../../domain/usecases/sales/update-sale'
import { noContent, serverError } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class UpdateSaleController implements Controller {
  constructor(private readonly updateSale: UpdateSale) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { saleId } = httpRequest.params
      const { data } = httpRequest.body
      await this.updateSale.execute({
        saleId,
        data
      })
      return Promise.resolve(noContent())
    } catch (error) {
      return serverError(error)
    }
  }
}
