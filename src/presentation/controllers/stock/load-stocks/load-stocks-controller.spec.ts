import { StockModel } from '../../../../domain/models/stock'
import { LoadStocks } from '../../../../domain/usecases/stock/load-stock'
import { LoadStocksController } from './load-stocks-controller'
import { serverError, ok, noContent } from '../../../helpers/http-helper'

const makeFakeStockModel = (): StockModel[] => {
  return [
    {
      id: 'any_id',
      modelName: 'any_model',
      color: 'any_color',
      quantity: 1
    }
  ]
}

const makeLoadStocksStub = (): LoadStocks => {
  class LoadStocksStub implements LoadStocks {
    async loadAll(): Promise<LoadStocks.Result> {
      return Promise.resolve(makeFakeStockModel())
    }
  }
  return new LoadStocksStub()
}

type SutTypes = {
  sut: LoadStocksController
  loadStocksStub: LoadStocks
}

const makeSut = (): SutTypes => {
  const loadStocksStub = makeLoadStocksStub()
  const sut = new LoadStocksController(loadStocksStub)
  return {
    sut,
    loadStocksStub
  }
}

describe('LoadStocksController', () => {
  test('Should call LoadStocks once', async () => {
    const { sut, loadStocksStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadStocksStub, 'loadAll')
    await sut.handle({})
    expect(loadAllSpy).toHaveBeenCalledTimes(1)
  })

  test('Should return 500 if LoadStocks throws', async () => {
    const { sut, loadStocksStub } = makeSut()
    jest.spyOn(loadStocksStub, 'loadAll').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on LoadStocks success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(makeFakeStockModel()))
  })

  test('Should return 204 if LoadStocks returns empty', async () => {
    const { sut, loadStocksStub } = makeSut()
    jest
      .spyOn(loadStocksStub, 'loadAll')
      .mockReturnValueOnce(Promise.resolve([]))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(noContent())
  })
})
