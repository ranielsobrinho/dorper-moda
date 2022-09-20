import { StockModel } from '../../../../domain/models/stock'
import { LoadStocks } from '../../../../domain/usecases/stock/load-stock'
import { LoadStocksController } from './load-stocks-controller'

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
})