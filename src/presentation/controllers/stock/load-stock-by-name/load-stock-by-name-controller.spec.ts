import { LoadStockByNameController } from './load-stock-by-name-controller'
import { LoadStockByName } from '../../../../domain/usecases/stock/load-stock-by-name'
import { HttpRequest } from '../../../protocols/http'
import { StockModel } from '../../../../domain/models/stock'

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

describe('LoadStockByNameController', () => {
  test('Should call LoadStockByName with correct value', async () => {
    class LoadStockByNameStub implements LoadStockByName {
      async loadByName(stockName: string): Promise<LoadStockByName.Result> {
        return Promise.resolve(makeFakeStockModel())
      }
    }
    const loadStockByNameStub = new LoadStockByNameStub()
    const sut = new LoadStockByNameController(loadStockByNameStub)
    const loadStockByNameSpy = jest.spyOn(loadStockByNameStub, 'loadByName')
    await sut.handle(makeHttpRequest())
    expect(loadStockByNameSpy).toHaveBeenCalledWith(
      makeHttpRequest().body.stockName
    )
  })
})
