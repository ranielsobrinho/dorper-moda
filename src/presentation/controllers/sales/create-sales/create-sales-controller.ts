import { CreateSale } from '../../../../domain/usecases/sales/create-sales'
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

export class CreateSalesController implements Controller {
  constructor(
    private readonly createSales: CreateSale,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { clientName, deliveryFee, paymentForm, products, total } =
        httpRequest.body
      const saleError = await this.createSales.execute({
        clientName,
        deliveryFee,
        paymentForm,
        products,
        soldAt: new Date(),
        total
      })
      if (saleError === null) {
        return badRequest(new Error('Nome do modelo ou quantidade inválida.'))
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
