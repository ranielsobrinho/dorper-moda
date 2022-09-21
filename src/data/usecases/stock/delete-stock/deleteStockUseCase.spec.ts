import { DeleteStockRepository } from '../../../protocols/db/stock/deleteStockRepository'
import { DeleteStockUseCase } from './deleteStockUseCase'

const makeDeleteStockRepositoryStub = (): DeleteStockRepository => {
  class DeleteStockRepositoryStub implements DeleteStockRepository {
    async delete(stockId: string): Promise<void> {}
  }
  return new DeleteStockRepositoryStub()
}

type SutTypes = {
  sut: DeleteStockUseCase
  deleteStockRepositoryStub: DeleteStockRepository
}

const makeSut = (): SutTypes => {
  const deleteStockRepositoryStub = makeDeleteStockRepositoryStub()
  const sut = new DeleteStockUseCase(deleteStockRepositoryStub)
  return {
    sut,
    deleteStockRepositoryStub
  }
}

describe('DeleteStockUseCase', () => {
  test('Should call DeleteStockRepository with correct values', async () => {
    const { sut, deleteStockRepositoryStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteStockRepositoryStub, 'delete')
    await sut.execute('1')
    expect(deleteSpy).toHaveBeenCalledWith('1')
  })
})
