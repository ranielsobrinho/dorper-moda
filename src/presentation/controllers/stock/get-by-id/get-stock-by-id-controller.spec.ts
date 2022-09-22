import { GetStockById } from '../../../../domain/usecases/stock/get-stock-by-id'
import { StockModel } from '../../../../domain/models/stock'
import { HttpRequest } from '../../../protocols/http'
import { GetStockByIdController } from './get-stock-by-id-controller'

const makeFakeStockModel = (): StockModel => ({
  id: 'any_id',
  modelName: 'any_model',
  color: 'any_color',
  quantity: 1
})

const httpRequest = (): HttpRequest => ({
  body: {
    stockId: 1
  }
})

describe('GetStockByIdController', () => {
  test('Should call GetById with correct values', async () => {
    class GetByIdStub implements GetStockById {
      async execute(stockId: string): Promise<GetStockById.Result> {
        return Promise.resolve(makeFakeStockModel())
      }
    }
    const getByIdStub = new GetByIdStub()
    const sut = new GetStockByIdController(getByIdStub)
    const getByIdSpy = jest.spyOn(getByIdStub, 'execute')
    await sut.handle(httpRequest())
    expect(getByIdSpy).toHaveBeenCalledWith(httpRequest().body.stockId)
  })
})
