import { LoadStockByNameController } from './load-stock-by-name-controller'
import { LoadStockByName } from '../../../../domain/usecases/stock/load-stock-by-name'
import { HttpRequest } from '../../../protocols/http'
import { StockModel } from '../../../../domain/models/stock'
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

const makeHttpRequest = (): HttpRequest => ({
  body: {
    stockName: 'any_name'
  }
})

const makeLoadStockByNameStub = (): LoadStockByName => {
  class LoadStockByNameStub implements LoadStockByName {
    async loadByName(stockName: string): Promise<LoadStockByName.Result> {
      return Promise.resolve(makeFakeStockModel())
    }
  }
  return new LoadStockByNameStub()
}

type SutTypes = {
  sut: LoadStockByNameController
  loadStockByNameStub: LoadStockByName
}

const makeSut = (): SutTypes => {
  const loadStockByNameStub = makeLoadStockByNameStub()
  const sut = new LoadStockByNameController(loadStockByNameStub)
  return {
    sut,
    loadStockByNameStub
  }
}

describe('LoadStockByNameController', () => {
  test('Should call LoadStockByName with correct value', async () => {
    const { sut, loadStockByNameStub } = makeSut()
    const loadStockByNameSpy = jest.spyOn(loadStockByNameStub, 'loadByName')
    await sut.handle(makeHttpRequest())
    expect(loadStockByNameSpy).toHaveBeenCalledWith(
      makeHttpRequest().body.stockName
    )
  })

  test('Should return 500 if LoadStockByName throws', async () => {
    const { sut, loadStockByNameStub } = makeSut()
    jest
      .spyOn(loadStockByNameStub, 'loadByName')
      .mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 403 if LoadStockByName returns null', async () => {
    const { sut, loadStockByNameStub } = makeSut()
    jest
      .spyOn(loadStockByNameStub, 'loadByName')
      .mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('stockName')))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeHttpRequest())
    expect(httpResponse).toEqual(ok(makeFakeStockModel()))
  })
})
