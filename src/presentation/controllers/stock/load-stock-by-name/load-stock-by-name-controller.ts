import { LoadStockByName } from '../../../../domain/usecases/stock/load-stock-by-name'
import { InvalidParamError } from '../../../errors'
import {
  badRequest,
  forbidden,
  ok,
  serverError
} from '../../../helpers/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from '../../../protocols'

export class LoadStockByNameController implements Controller {
  constructor(
    private readonly loadStockByName: LoadStockByName,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { stockName } = httpRequest.body
      const stock = await this.loadStockByName.loadByName(stockName)
      if (!stock) {
        return forbidden(new InvalidParamError('stockName'))
      }
      return ok(stock)
    } catch (error) {
      return serverError(error)
    }
  }
}
