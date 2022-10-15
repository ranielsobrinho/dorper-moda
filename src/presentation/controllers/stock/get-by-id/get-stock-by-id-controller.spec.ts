import { GetStockById } from '../../../../domain/usecases/stock/get-stock-by-id'
import { StockModel } from '../../../../domain/models/stock'
import { HttpRequest } from '../../../protocols/http'
import { GetStockByIdController } from './get-stock-by-id-controller'
import { forbidden, serverError, ok } from '../../../helpers/http-helper'
import { InvalidParamError } from '../../../errors'

const makeFakeStockModel = (): StockModel => ({
  id: 'any_id',
  modelName: 'any_model',
  description: [
    {
      color: 'any_color',
      quantity: 1
    }
  ]
})

const httpRequest = (): HttpRequest => ({
  params: {
    stockId: 1
  }
})

const makeGetStockByIdStub = (): GetStockById => {
  class GetByIdStub implements GetStockById {
    async execute(stockId: string): Promise<GetStockById.Result> {
      return Promise.resolve(makeFakeStockModel())
    }
  }
  return new GetByIdStub()
}

type SutTypes = {
  sut: GetStockByIdController
  getByIdStub: GetStockById
}

const makeSut = (): SutTypes => {
  const getByIdStub = makeGetStockByIdStub()
  const sut = new GetStockByIdController(getByIdStub)
  return {
    sut,
    getByIdStub
  }
}

describe('GetStockByIdController', () => {
  test('Should call GetStockById with correct values', async () => {
    const { sut, getByIdStub } = makeSut()
    const getByIdSpy = jest.spyOn(getByIdStub, 'execute')
    await sut.handle(httpRequest())
    expect(getByIdSpy).toHaveBeenCalledWith(httpRequest().params.stockId)
  })

  test('Should return 500 if GetStockById throws', async () => {
    const { sut, getByIdStub } = makeSut()
    jest.spyOn(getByIdStub, 'execute').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(httpRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 403 if GetStockById returns null', async () => {
    const { sut, getByIdStub } = makeSut()
    jest.spyOn(getByIdStub, 'execute').mockResolvedValueOnce(null)
    const httpResponse = await sut.handle(httpRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('stockId')))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(httpRequest())
    expect(httpResponse).toEqual(ok(makeFakeStockModel()))
  })
})
