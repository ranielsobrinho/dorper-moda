import { UpdateStock } from '../../../../domain/usecases/stock/update-stock'
import { HttpRequest } from '../../../protocols/http'
import { UpdateStockController } from './update-stock-controller'

const makeStockDataRequest = (): HttpRequest => ({
  body: {
    stockId: 'any_id',
    data: {
      modelName: 'any_name',
      color: 'any_color',
      quantity: 1
    }
  }
})

describe('UpdateStockController', () => {
  test('Should call UpdateStock with correct values', async () => {
    class UpdateStockStub implements UpdateStock {
      async execute(params: UpdateStock.Params): Promise<UpdateStock.Result> {}
    }
    const updateStockStub = new UpdateStockStub()
    const sut = new UpdateStockController(updateStockStub)
    const updateSpy = jest.spyOn(updateStockStub, 'execute')
    await sut.handle(makeStockDataRequest())
    expect(updateSpy).toHaveBeenCalledWith(makeStockDataRequest().body)
  })
})
