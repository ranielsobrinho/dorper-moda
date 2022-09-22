import { DeleteStockRepository } from '../../../protocols/db/stock/deleteStockRepository'
import { DeleteStockUseCase } from './deleteStockUseCase'
import { StockModel } from '../../../../domain/models/stock'
import { GetStockByIdRepository } from '../../../protocols/db/stock/getStockByIdRepository'

const makeFakeStockData = (): StockModel => ({
  id: 'any_id',
  modelName: 'any_name',
  color: 'any_color',
  quantity: 1
})

const makeGetStockByIdRepositoryStub = (): GetStockByIdRepository => {
  class GetStockByIdRepositoryStub implements GetStockByIdRepository {
    async getById(stockId: string): Promise<GetStockByIdRepository.Result> {
      return Promise.resolve(makeFakeStockData())
    }
  }
  return new GetStockByIdRepositoryStub()
}

const makeDeleteStockRepositoryStub = (): DeleteStockRepository => {
  class DeleteStockRepositoryStub implements DeleteStockRepository {
    async delete(stockId: string): Promise<void> {}
  }
  return new DeleteStockRepositoryStub()
}

type SutTypes = {
  sut: DeleteStockUseCase
  deleteStockRepositoryStub: DeleteStockRepository
  getStockByIdRepositoryStub: GetStockByIdRepository
}

const makeSut = (): SutTypes => {
  const deleteStockRepositoryStub = makeDeleteStockRepositoryStub()
  const getStockByIdRepositoryStub = makeGetStockByIdRepositoryStub()
  const sut = new DeleteStockUseCase(
    deleteStockRepositoryStub,
    getStockByIdRepositoryStub
  )
  return {
    sut,
    deleteStockRepositoryStub,
    getStockByIdRepositoryStub
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

  test('Should call GetStockByIdRepository with correct values', async () => {
    const { sut, getStockByIdRepositoryStub } = makeSut()
    const getByIdSpy = jest.spyOn(getStockByIdRepositoryStub, 'getById')
    await sut.execute('1')
    expect(getByIdSpy).toHaveBeenCalledWith('1')
  })
})
