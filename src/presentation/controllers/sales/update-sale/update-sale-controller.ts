import { UpdateSale } from '../../../../domain/usecases/sales/update-sale'
import { InvalidParamError } from '../../../errors'
import {
  badRequest,
  noContent,
  serverError
} from '../../../helpers/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from '../../../protocols'

export class UpdateSaleController implements Controller {
  constructor(
    private readonly updateSale: UpdateSale,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { saleId } = httpRequest.params
      const { data } = httpRequest.body

      this.validation.validate(data)

      const updateData = await this.updateSale.execute({
        saleId,
        data
      })

      if (!updateData) {
        return badRequest(new InvalidParamError('saleId'))
      }

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
