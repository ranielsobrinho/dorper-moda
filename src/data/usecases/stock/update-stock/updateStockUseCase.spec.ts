import { UpdateStockRepository } from '../../../protocols/db/stock/updateStockRepository'
import { UpdateStockUseCase } from './updateStockUseCase'

const makeStockDataRequest = (): UpdateStockRepository.Params => ({
  stockId: 'any_id',
  data: {
    modelName: 'any_name',
    color: 'any_color',
    quantity: 1
  }
})

describe('UpdateStockUseCase', () => {
  test('Should call UpdateStockUseCase with correct values', async () => {
    class UpdateStockRepositoryStub implements UpdateStockRepository {
      async update(
        params: UpdateStockRepository.Params
      ): Promise<UpdateStockRepository.Result> {}
    }
    const updateStockRepositoryStub = new UpdateStockRepositoryStub()
    const sut = new UpdateStockUseCase(updateStockRepositoryStub)
    const updateSpy = jest.spyOn(updateStockRepositoryStub, 'update')
    sut.execute(makeStockDataRequest())
    expect(updateSpy).toHaveBeenCalledWith(makeStockDataRequest())
  })
})
