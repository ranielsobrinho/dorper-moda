import { GetSaleById } from '../../../../domain/usecases/sales/get-sale-by-id'
import { InvalidParamError } from '../../../errors'
import { badRequest, ok, serverError } from '../../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class GetSaleByIdController implements Controller {
  constructor(private readonly getSaleById: GetSaleById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { saleId } = httpRequest.body
      const saleData = await this.getSaleById.getById(saleId)

      if (!saleData) {
        return badRequest(new InvalidParamError('saleId'))
      }

      return ok(saleData)
    } catch (error) {
      return serverError(error)
    }
  }
}
