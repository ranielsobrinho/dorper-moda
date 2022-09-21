import { DeleteStockRepository } from '../../../protocols/db/stock/deleteStockRepository'
import { DeleteStockUseCase } from './deleteStockUseCase'

describe('DeleteStockUseCase', () => {
  test('Should call DeleteStockRepository with correct values', async () => {
    class DeleteStockRepositoryStub implements DeleteStockRepository {
      async delete(stockId: string): Promise<void> {}
    }
    const deleteStockRepositoryStub = new DeleteStockRepositoryStub()
    const sut = new DeleteStockUseCase(deleteStockRepositoryStub)
    const deleteSpy = jest.spyOn(deleteStockRepositoryStub, 'delete')
    await sut.execute('1')
    expect(deleteSpy).toHaveBeenCalledWith('1')
  })
})
