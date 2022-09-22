import { DeleteStockRepository } from '../../../protocols/db/stock/deleteStockRepository'
import { DeleteStockUseCase } from './deleteStockUseCase'

const makeDeleteStockRepositoryStub = (): DeleteStockRepository => {
  class DeleteStockRepositoryStub implements DeleteStockRepository {
    async delete(stockId: string): Promise<number> {
      return Promise.resolve(1)
    }
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

  test('Should throw if DeleteStockRepository throws', async () => {
    const { sut, deleteStockRepositoryStub } = makeSut()
    jest
      .spyOn(deleteStockRepositoryStub, 'delete')
      .mockRejectedValueOnce(new Error())
    const promise = sut.execute('1')
    await expect(promise).rejects.toThrow()
  })
})
