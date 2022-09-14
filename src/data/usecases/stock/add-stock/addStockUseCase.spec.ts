import { AddStockRepository } from '../../../protocols/db/stock/addStockRepository'
import { AddStockUseCase } from './addStockUseCase'

describe('AddStockUseCase', () => {
  test('Should call AddStockRepository with correct values', async () => {
    class AddStockRepositoryStub implements AddStockRepository {
      async add({}): Promise<void> {
        return
      }
    }
    const addStockRepositoryStub = new AddStockRepositoryStub()
    const sut = new AddStockUseCase(addStockRepositoryStub)
    const addStockSpy = jest.spyOn(addStockRepositoryStub, 'add')
    await sut.execute({
      modelName: 'any_name',
      color: 'any_color',
      quantity: 1,
    })
    expect(addStockSpy).toHaveBeenCalledWith({
      modelName: 'any_name',
      color: 'any_color',
      quantity: 1,
    })
  })
})
