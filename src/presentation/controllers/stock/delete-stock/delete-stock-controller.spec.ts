import { DeleteStock } from '../../../../domain/usecases/stock/delete-stock'
import { HttpRequest } from '../../../protocols'
import { DeleteStockController } from './delete-stock-controller'

const makeDeleteRequest = (): HttpRequest => ({
  body: {
    stockId: 1
  }
})

describe('DeleteStockController', () => {
  test('Should call DeleteStock with correct values', async () => {
    class DeleteStockStub implements DeleteStock {
      async execute(stockId: string): Promise<void> {}
    }
    const deleteStockStub = new DeleteStockStub()
    const sut = new DeleteStockController(deleteStockStub)
    const deleteStockSpy = jest.spyOn(deleteStockStub, 'execute')
    await sut.handle(makeDeleteRequest())
    expect(deleteStockSpy).toHaveBeenCalledWith(
      makeDeleteRequest().body.stockId
    )
  })
})
